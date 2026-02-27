import React, { useState, useEffect } from "react";
import { Settings, X, Save, RotateCcw, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAMESPACE = "DRUG_RISK_ANALYSIS__v1__";

// ANNEX URL - Update this single constant to change the link everywhere
const ANNEX_URL = "https://example.com/annex"; // TODO: Replace with actual methodology URL

interface EditableField {
  key: string;
  label: string;
  value: string;
  type: "text" | "textarea";
}

export function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditingEnabled, setIsEditingEnabled] = useState(false);
  const [editableFields, setEditableFields] = useState<EditableField[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize editable fields from DOM on mount
  useEffect(() => {
    if (!isOpen) return;
    loadEditableFields();
  }, [isOpen]);

  const loadEditableFields = () => {
    const fields: EditableField[] = [];
    
    // Find all editable sections (drug sections 01-10)
    const sections = document.querySelectorAll("[data-editable-section]");
    
    sections.forEach((section) => {
      const sectionId = section.getAttribute("data-editable-section");
      if (!sectionId) return;

      // Section number
      const numberEl = section.querySelector("[data-editable='number']");
      if (numberEl) {
        fields.push({
          key: `${sectionId}_number`,
          label: `${sectionId} - Section Number`,
          value: numberEl.textContent || "",
          type: "text",
        });
      }

      // Section header
      const headerEl = section.querySelector("[data-editable='header']");
      if (headerEl) {
        fields.push({
          key: `${sectionId}_header`,
          label: `${sectionId} - Header`,
          value: headerEl.textContent || "",
          type: "text",
        });
      }

      // Section subheader
      const subheaderEl = section.querySelector("[data-editable='subheader']");
      if (subheaderEl) {
        fields.push({
          key: `${sectionId}_subheader`,
          label: `${sectionId} - Subheader`,
          value: subheaderEl.textContent || "",
          type: "text",
        });
      }

      // Section body
      const bodyEl = section.querySelector("[data-editable='body']");
      if (bodyEl) {
        fields.push({
          key: `${sectionId}_body`,
          label: `${sectionId} - Body Content`,
          value: bodyEl.innerHTML || "",
          type: "textarea",
        });
      }
    });

    setEditableFields(fields);
  };

  const handleFieldChange = (key: string, value: string) => {
    setEditableFields((prev) =>
      prev.map((field) => (field.key === key ? { ...field, value } : field))
    );
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    // Save to localStorage
    editableFields.forEach((field) => {
      localStorage.setItem(`${NAMESPACE}${field.key}`, field.value);
    });

    // Apply changes to DOM
    applyChangesToDOM();
    setHasChanges(false);
    alert("Changes saved to localStorage!");
  };

  const applyChangesToDOM = () => {
    editableFields.forEach((field) => {
      const [sectionId, fieldType] = field.key.split("_").slice(0, 2).join("_").split("_");
      const element = document.querySelector(
        `[data-editable-section="${sectionId}"] [data-editable="${fieldType}"]`
      );
      if (element) {
        if (field.type === "textarea") {
          element.innerHTML = field.value;
        } else {
          element.textContent = field.value;
        }
      }
    });
  };

  const handleReset = () => {
    if (
      confirm(
        "Clear all edits and reload? This will remove all saved changes from localStorage."
      )
    ) {
      // Clear only this namespace
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(NAMESPACE)) {
          localStorage.removeItem(key);
        }
      });
      window.location.reload();
    }
  };

  const handleExportHTML = () => {
    const html = document.documentElement.outerHTML;
    // Remove admin UI from export
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    
    // Remove admin panel
    const adminPanel = doc.querySelector("[data-admin-panel]");
    if (adminPanel) adminPanel.remove();
    
    // Add export footer
    const footer = doc.createElement("footer");
    footer.className = "export-footer";
    footer.innerHTML = `
      <p style="text-align: center; margin-top: 3rem; padding: 2rem; border-top: 1px solid #ccc; font-size: 0.9rem; color: #666;">
        When Policy Kills — Research Report (exported)<br/>
        <em>See page for full authorship and attribution.</em>
      </p>
    `;
    doc.body.appendChild(footer);

    const blob = new Blob([doc.documentElement.outerHTML], {
      type: "text/html",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "When_Policy_Kills_Research_Report.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrintPDF = () => {
    // Hide admin UI before printing
    const adminPanel = document.querySelector("[data-admin-panel]");
    if (adminPanel) {
      (adminPanel as HTMLElement).style.display = "none";
    }
    window.print();
    // Show admin UI again
    if (adminPanel) {
      (adminPanel as HTMLElement).style.display = "block";
    }
  };

  return (
    <>
      {/* Admin Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-primary/20 hover:bg-primary/40 text-primary transition-all opacity-50 hover:opacity-100 group"
        title="Admin Panel"
        aria-label="Open admin panel"
      >
        <Settings className="w-5 h-5" />
      </button>

      {/* Admin Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="flex-1 bg-black/50"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <div
            data-admin-panel
            className="w-96 bg-background border-l border-border shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-card">
              <h2 className="text-lg font-bold">Admin Panel</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-muted rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Edit Toggle */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isEditingEnabled}
                    onChange={(e) => setIsEditingEnabled(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Enable Editing</span>
                </label>
              </div>

              {/* Editable Fields */}
              {isEditingEnabled && (
                <div className="space-y-4 border-t border-border pt-4">
                  {editableFields.map((field) => (
                    <div key={field.key} className="space-y-2">
                      <label className="text-xs font-mono text-muted-foreground">
                        {field.label}
                      </label>
                      {field.type === "text" ? (
                        <input
                          type="text"
                          value={field.value}
                          onChange={(e) =>
                            handleFieldChange(field.key, e.target.value)
                          }
                          className="w-full px-2 py-1 text-sm bg-muted border border-border rounded text-foreground"
                        />
                      ) : (
                        <textarea
                          value={field.value}
                          onChange={(e) =>
                            handleFieldChange(field.key, e.target.value)
                          }
                          className="w-full px-2 py-1 text-sm bg-muted border border-border rounded text-foreground h-24 resize-none"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Export Section */}
              <div className="border-t border-border pt-4 space-y-2">
                <p className="text-xs font-mono text-muted-foreground">Export</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full justify-start text-xs"
                  onClick={handleExportHTML}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export HTML
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full justify-start text-xs"
                  onClick={handlePrintPDF}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF (Print)
                </Button>
              </div>

              {/* Annex Link */}
              <div className="border-t border-border pt-4">
                <a
                  href={ANNEX_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-sm text-primary hover:underline"
                >
                  Full Methodology
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="border-t border-border p-4 space-y-2 bg-card">
              {hasChanges && (
                <p className="text-xs text-yellow-600 font-mono">
                  Unsaved changes
                </p>
              )}
              <Button
                size="sm"
                className="w-full"
                onClick={handleSaveChanges}
                disabled={!hasChanges && !isEditingEnabled}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-full"
                onClick={handleReset}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset to Original
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
