import { createContext, useContext, useEffect, useState } from 'react';
import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../config/firebase';

const SOSContext = createContext();

export function useSOSAlerts() {
  return useContext(SOSContext);
}

export function SOSProvider({ children }) {
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [resolvedAlerts, setResolvedAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Create queries for both active and resolved SOS alerts
    const activeQuery = query(
      collection(db, 'SOS'),
      where('isActive', '==', true)
    );

    const resolvedQuery = query(
      collection(db, 'SOS'),
      where('isActive', '==', false)
    );

    // Set up real-time listeners for both queries
    const unsubscribeActive = onSnapshot(
      activeQuery,
      (querySnapshot) => {
        const alerts = [];
        querySnapshot.forEach((doc) => {
          alerts.push({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate() || new Date(),
          });
        });
        
        // Sort by timestamp, most recent first
        alerts.sort((a, b) => b.timestamp - a.timestamp);
        setActiveAlerts(alerts);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching active SOS alerts:', error);
        setError(error);
        setLoading(false);
      }
    );

    const unsubscribeResolved = onSnapshot(
      resolvedQuery,
      (querySnapshot) => {
        const alerts = [];
        querySnapshot.forEach((doc) => {
          alerts.push({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate() || new Date(),
            resolvedAt: doc.data().resolvedAt?.toDate() || new Date(),
          });
        });
        
        // Sort by resolved timestamp, most recent first
        alerts.sort((a, b) => b.resolvedAt - a.resolvedAt);
        setResolvedAlerts(alerts);
      },
      (error) => {
        console.error('Error fetching resolved SOS alerts:', error);
        setError(error);
      }
    );

    // Cleanup subscriptions
    return () => {
      unsubscribeActive();
      unsubscribeResolved();
    };
  }, []);

  const resolveSOSAlert = async (sosId) => {
    try {
      const sosRef = doc(db, 'SOS', sosId);
      await updateDoc(sosRef, {
        isActive: false,
        resolvedAt: new Date(),
      });
      return true;
    } catch (err) {
      console.error('Error resolving SOS alert:', err);
      setError(err);
      return false;
    }
  };

  const value = {
    activeAlerts,
    resolvedAlerts,
    loading,
    error,
    resolveSOSAlert
  };

  return (
    <SOSContext.Provider value={value}>
      {children}
    </SOSContext.Provider>
  );
}