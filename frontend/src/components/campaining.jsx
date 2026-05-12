import { useState } from "react";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";

function Campaigns() {
  const [campaignName, setCampaignName] = useState("");
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [csvData, setCsvData] = useState([]);
 
  const handleStart = () => {

  if (!campaignName.trim()) {
    toast.error("Campaign name is required");
    return;
  }

  if (!description.trim()) {
    toast.error("Campaign description is required");
    return;
  }

  if (!csvFile) {
    toast.error("Please upload CSV file");
    return;
  }

  toast.success("Campaign Started Successfully");
};


  const handleStop = () => {
    toast.error("Campaign Stopped");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    // Check CSV file
    if (file.type !== "text/csv") {
      toast.error("Please upload a CSV file");
      return;
    }

    setFileName(file.name);
    setCsvFile(file);

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;

      // Convert CSV text into array
      const rows = text.split("\n").map((row) => row.split(","));

      setCsvData(rows);

      toast.success("CSV Uploaded Successfully");
    };

    reader.readAsText(file);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      
      {/* LEFT SECTION */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6">
        <h1 className="text-2xl font-bold mb-6">
          Create Campaign
        </h1>

        <div className="space-y-5">

          {/* Campaign Name */}
          <input
            type="text"
            value={campaignName}
            onChange={(e) =>
              setCampaignName(e.target.value)
            }
            placeholder="Campaign Name"
            className="w-full bg-white/10 p-4 rounded-2xl outline-none"
          />

          {/* Description */}
          <textarea
            rows="5"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Campaign Description"
            className="w-full bg-white/10 p-4 rounded-2xl outline-none"
/>
          {/* CSV Upload */}
          <label className="border-2 border-dashed border-white/20 rounded-2xl p-10 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all">
            
            <Upload size={40} className="mb-4 text-cyan-400" />

            <p className="text-lg font-semibold">
              Upload CSV File
            </p>

            <p className="text-sm text-gray-400 mt-2">
              Click to browse CSV file
            </p>

            {fileName && (
              <p className="mt-4 text-green-400 font-medium">
                {fileName}
              </p>
            )}

            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleStart}
              className="bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3 rounded-2xl hover:scale-105 transition-all"
            >
              Start Campaign
            </button>

            <button
              onClick={handleStop}
              className="bg-gradient-to-r from-pink-500 to-red-500 px-6 py-3 rounded-2xl hover:scale-105 transition-all"
            >
              Stop Campaign
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="space-y-6">

        {/* Active Campaign */}
        <div className="bg-white/10 rounded-3xl p-6 border border-white/10">
          <h2 className="text-xl font-bold mb-4">
            Active Campaign
          </h2>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <p>Election Awareness Drive</p>
                <p>78%</p>
              </div>

              <div className="w-full bg-white/10 h-3 rounded-full">
                <div className="bg-gradient-to-r from-purple-500 to-cyan-500 h-3 rounded-full w-[78%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Status */}
        <div className="bg-white/10 rounded-3xl p-6 border border-white/10">
          <h2 className="text-xl font-bold mb-4">
            Campaign Status
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-500/20 p-5 rounded-2xl">
              <h3 className="text-3xl font-bold">12</h3>
              <p>Running</p>
            </div>

            <div className="bg-yellow-500/20 p-5 rounded-2xl">
              <h3 className="text-3xl font-bold">4</h3>
              <p>Paused</p>
            </div>
          </div>
        </div>

        {/* CSV Preview */}
        {csvData.length > 0 && (
          <div className="bg-white/10 rounded-3xl p-6 border border-white/10 overflow-auto">
            <h2 className="text-xl font-bold mb-4">
              CSV Preview
            </h2>

            <table className="w-full border-collapse">
              <tbody>
                {csvData.slice(0, 5).map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-b border-white/10"
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="p-3 text-sm"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Campaigns;