import { useState } from "react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import {
  CookieCategory,
  CookiePreferences,
  COOKIE_DESCRIPTIONS,
} from "@/types/CookieCategory";
import { Shield, BarChart3, Megaphone, Settings2, Cookie } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const CATEGORY_ICONS: Record<CookieCategory, React.ReactNode> = {
  essential: <Shield className="h-5 w-5 text-green-600" />,
  analytics: <BarChart3 className="h-5 w-5 text-blue-600" />,
  marketing: <Megaphone className="h-5 w-5 text-orange-600" />,
};

export default function CookieSettingsButton() {
  const { preferences, hasResponded, isLoaded, savePreferences } =
    useCookieConsent();

  const [showPreferences, setShowPreferences] = useState(false);
  const [tempPrefs, setTempPrefs] = useState<CookiePreferences>(preferences);

  // Only show after user has already responded
  if (!isLoaded || !hasResponded) return null;

  const handleOpen = () => {
    setTempPrefs({ ...preferences });
    setShowPreferences(true);
  };

  const handleToggleCategory = (category: CookieCategory) => {
    if (category === "essential") return;
    setTempPrefs((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSave = () => {
    savePreferences(tempPrefs);
    setShowPreferences(false);
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed bottom-4 left-4 z-40 h-10 w-10 rounded-full shadow-lg bg-white dark:bg-gray-900 border-gray-300"
              onClick={handleOpen}
              aria-label="Cookie settings"
            >
              <Cookie className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Cookie Settings</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings2 className="h-5 w-5" />
              Cookie Preferences
            </DialogTitle>
            <DialogDescription>
              Update your cookie preferences at any time. Essential cookies
              cannot be disabled.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {(Object.keys(COOKIE_DESCRIPTIONS) as CookieCategory[]).map(
              (category) => {
                const info = COOKIE_DESCRIPTIONS[category];
                return (
                  <div
                    key={category}
                    className="flex items-start gap-4 rounded-lg border p-4"
                  >
                    <div className="shrink-0 mt-0.5">
                      {CATEGORY_ICONS[category]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {info.title}
                        </h4>
                        <Switch
                          checked={tempPrefs[category]}
                          onCheckedChange={() => handleToggleCategory(category)}
                          disabled={info.required}
                          aria-label={`Toggle ${info.title}`}
                        />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {info.description}
                      </p>
                      {info.required && (
                        <span className="inline-block text-xs text-green-600 font-medium mt-1">
                          Always active
                        </span>
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowPreferences(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button onClick={handleSave} className="w-full sm:w-auto">
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}