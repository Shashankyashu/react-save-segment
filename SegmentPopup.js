import React, { useState } from "react";
import axios from "axios";

const schemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

function SegmentPopup({ onClose }) {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([{ value: "" }]);

  // Add new dropdown when "+Add new schema" clicked
  const handleAddNewSchema = () => {
    setSelectedSchemas([...selectedSchemas, { value: "" }]);
  };

  // Handle dropdown change
  const handleSchemaChange = (index, value) => {
    const updated = [...selectedSchemas];
    updated[index].value = value;
    setSelectedSchemas(updated);
  };

  // Filter out already selected options
  const availableOptions = (index) => {
    const selectedValues = selectedSchemas.map((s) => s.value);
    return schemaOptions.filter(
      (option) => !selectedValues.includes(option.value) || selectedSchemas[index].value === option.value
    );
  };

  // Submit data
  const handleSaveSegment = async () => {
    const dataToSend = {
      segment_name: segmentName,
      schema: selectedSchemas
        .filter((s) => s.value !== "")
        .map((s) => {
          const label = schemaOptions.find((opt) => opt.value === s.value)?.label;
          return { [s.value]: label };
        }),
    };

    console.log("Data sent to server:", dataToSend);

    try {
      // Replace with your webhook URL from https://webhook.site
      const webhookURL = "https://webhook.site/your-webhook-url";
      await axios.post(webhookURL, dataToSend);
      alert("Segment saved successfully!");
      onClose();
    } catch (error) {
      alert("Error saving segment!");
      console.error(error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          width: "400px",
        }}
      >
        <h2>Saving Segment</h2>
        <label>Enter the Name of the Segment:</label>
        <input
          type="text"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
          placeholder="Name of the segment"
          style={{ width: "100%", padding: "8px", marginBottom: "15px" }}
        />

        <p>To save your segment, add the schemas to build the query.</p>

        <div
          style={{
            border: "1px solid #008080",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
        >
          {selectedSchemas.map((schema, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <select
                value={schema.value}
                onChange={(e) => handleSchemaChange(index, e.target.value)}
                style={{ width: "100%", padding: "8px" }}
              >
                <option value="">Add schema to segment</option>
                {availableOptions(index).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button
            onClick={handleAddNewSchema}
            style={{
              background: "none",
              border: "none",
              color: "#008080",
              cursor: "pointer",
            }}
          >
            + Add new schema
          </button>
        </div>

        <div style={{ textAlign: "right" }}>
          <button
            onClick={handleSaveSegment}
            style={{
              backgroundColor: "#008080",
              color: "white",
              padding: "8px 15px",
              border: "none",
              borderRadius: "5px",
              marginRight: "10px",
            }}
          >
            Save the Segment
          </button>
          <button
            onClick={onClose}
            style={{
              backgroundColor: "#f44336",
              color: "white",
              padding: "8px 15px",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default SegmentPopup;
