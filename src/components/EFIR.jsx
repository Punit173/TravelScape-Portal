import { useState } from "react";

export default function EFIRForm() {
  const [formData, setFormData] = useState({
    reporterName: "",
    reporterContact: "",
    reporterAddress: "",
    missingName: "",
    missingAge: "",
    missingGender: "",
    missingAddress: "",
    missingDate: "",
    missingPlace: "",
    description: "",
  });

  const [generatedFIR, setGeneratedFIR] = useState(null);

  // Handle field updates
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Generate E-FIR
  const handleGenerate = () => {
    if (
      !formData.reporterName ||
      !formData.missingName ||
      !formData.missingDate ||
      !formData.missingPlace
    ) {
      alert("Please fill all required fields");
      return;
    }

    const fir = {
      type: "E-FIR (Missing Person)",
      firId: "FIR-" + Date.now(),
      filedOn: new Date().toISOString(),
      reporter: {
        name: formData.reporterName,
        contact: formData.reporterContact,
        address: formData.reporterAddress,
      },
      missingPerson: {
        name: formData.missingName,
        age: formData.missingAge,
        gender: formData.missingGender,
        address: formData.missingAddress,
        lastSeenDate: formData.missingDate,
        lastSeenPlace: formData.missingPlace,
        description: formData.description,
      },
      status: "Filed - Pending Verification",
    };

    setGeneratedFIR(fir);
  };

  // Download as JSON
  const handleDownload = () => {
    if (!generatedFIR) return;
    const blob = new Blob([JSON.stringify(generatedFIR, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${generatedFIR.firId}.json`;
    link.click();
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">E-FIR Generator (Missing Person)</h2>

      {/* Reporter Details */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Reporter Details</h3>
        <input
          type="text"
          name="reporterName"
          placeholder="Reporter Name *"
          className="w-full border rounded p-2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="reporterContact"
          placeholder="Reporter Contact"
          className="w-full border rounded p-2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="reporterAddress"
          placeholder="Reporter Address"
          className="w-full border rounded p-2"
          onChange={handleChange}
        />
      </div>

      {/* Missing Person Details */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Missing Person Details</h3>
        <input
          type="text"
          name="missingName"
          placeholder="Missing Person Name *"
          className="w-full border rounded p-2"
          onChange={handleChange}
        />
        <input
          type="number"
          name="missingAge"
          placeholder="Age"
          className="w-full border rounded p-2"
          onChange={handleChange}
        />
        <select
          name="missingGender"
          className="w-full border rounded p-2"
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input
          type="text"
          name="missingAddress"
          placeholder="Last Known Address"
          className="w-full border rounded p-2"
          onChange={handleChange}
        />
        <input
          type="date"
          name="missingDate"
          placeholder="Last Seen Date *"
          className="w-full border rounded p-2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="missingPlace"
          placeholder="Last Seen Place *"
          className="w-full border rounded p-2"
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Additional Description (Clothes, Height, etc.)"
          className="w-full border rounded p-2"
          rows="3"
          onChange={handleChange}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={handleGenerate}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Generate E-FIR
        </button>
        {generatedFIR && (
          <button
            onClick={handleDownload}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Download E-FIR
          </button>
        )}
      </div>

      {/* Preview */}
      {generatedFIR && (
        <div className="bg-gray-100 p-4 rounded mt-4">
          <h3 className="font-semibold text-lg mb-2">Generated FIR</h3>
          <pre className="text-sm text-gray-800 overflow-x-auto">
            {JSON.stringify(generatedFIR, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
