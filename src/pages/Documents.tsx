import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Download, Eye } from "lucide-react";

const Documents = () => {
  const documents = [
    {
      id: "DOC-001",
      name: "Bill of Lading - SH-2024-001",
      type: "Bill of Lading",
      shipment: "SH-2024-001",
      uploadDate: "2024-01-05",
      size: "2.4 MB",
    },
    {
      id: "DOC-002",
      name: "Commercial Invoice - SH-2024-001",
      type: "Commercial Invoice",
      shipment: "SH-2024-001",
      uploadDate: "2024-01-05",
      size: "1.8 MB",
    },
    {
      id: "DOC-003",
      name: "Packing List - SH-2024-002",
      type: "Packing List",
      shipment: "SH-2024-002",
      uploadDate: "2024-01-03",
      size: "956 KB",
    },
    {
      id: "DOC-004",
      name: "Certificate of Origin - SH-2024-002",
      type: "Certificate",
      shipment: "SH-2024-002",
      uploadDate: "2024-01-03",
      size: "1.2 MB",
    },
  ];

  const getDocTypeColor = (type: string) => {
    switch (type) {
      case "Bill of Lading":
        return "bg-blue-100 text-blue-700";
      case "Commercial Invoice":
        return "bg-accent/10 text-accent";
      case "Packing List":
        return "bg-orange-100 text-orange-700";
      case "Certificate":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Document Center" />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">Document Vault</h2>
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Upload Document
          </Button>
        </div>

        <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <div className="flex items-start gap-4">
            <FileText className="h-8 w-8 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-bold text-foreground mb-1">Secure Digital Vault</h3>
              <p className="text-sm text-muted-foreground">
                Store all your important trade documents in one secure location. Upload bills of lading,
                commercial invoices, packing lists, and certificates of origin.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid gap-4">
          {documents.map((doc) => (
            <Card key={doc.id} className="p-5 hover:shadow-elevated transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 bg-muted rounded-lg">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 truncate">{doc.name}</h3>
                    <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDocTypeColor(doc.type)}`}>
                        {doc.type}
                      </span>
                      <span>•</span>
                      <span>Shipment: {doc.shipment}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>Uploaded: {doc.uploadDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Documents;
