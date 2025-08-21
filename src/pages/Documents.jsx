import Sidebar from "../components/Sidebar";
import Navbar from "./Navbar";
const Documents = () => {
   
  return (
    <div style={{ display: "flex", alignItems: "start" }}>
      {/* Sidebar */}
      <div style={{ width: "20%" }}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="p-6" style={{ width: "80%", height: "100vh" }}>
        <Navbar />

        
        <p>Documents</p>
        
        
      </div>
    </div>
  );
};

export default Documents;
