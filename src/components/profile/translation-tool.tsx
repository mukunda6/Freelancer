"use client";

import { useState } from "react";
import { translateUserProfile, TranslateUserProfileOutput } from "@/ai/flows/translate-user-profile";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Languages } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const languages = [
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "ja", name: "Japanese" },
  { code: "pt", name: "Portuguese" },
  { code: "zh", name: "Chinese" },
  { code: "ru", name: "Russian" },
];

export function TranslationTool() {
  const [textToTranslate, setTextToTranslate] = useState("Experienced full-stack developer with a passion for building scalable and user-friendly web applications. Proficient in modern JavaScript frameworks and cloud technologies.");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [translations, setTranslations] = useState<TranslateUserProfileOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTranslate = async () => {
    if (!textToTranslate.trim()) {
        toast({
            title: "Error",
            description: "Please enter some text to translate.",
            variant: "destructive",
        });
        return;
    }
    setIsLoading(true);
    setTranslations(null);
    try {
      const result = await translateUserProfile({
        text: textToTranslate,
        targetLanguages: [targetLanguage],
      });
      setTranslations(result);
    } catch (e) {
      console.error(e);
      toast({
        title: "Translation Failed",
        description: "Could not translate the profile bio. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="bio-translate">Your Bio</Label>
        <Textarea
          id="bio-translate"
          value={textToTranslate}
          onChange={(e) => setTextToTranslate(e.target.value)}
          placeholder="Enter the text you want to translate."
          className="min-h-[100px]"
        />
      </div>
      <div className="flex items-end gap-4">
        <div className="flex-1 space-y-2">
          <Label htmlFor="target-lang">Target Language</Label>          <Select value={targetLanguage} onValueChange={setTargetLanguage}>
            <SelectTrigger id="target-lang">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleTranslate} disabled={isLoading}>
          <Languages className="mr-2 h-4 w-4" />
          {isLoading ? "Translating..." : "Translate"}
        </Button>
      </div>
      
      {(isLoading || translations) && (
        <div className="pt-4">
          <h4 className="text-sm font-semibold mb-2">Translation Result:</h4>
          <Card>
            <CardContent className="p-6">
              {isLoading ? (
                <div className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
              ) : (
                translations && Object.entries(translations).map(([lang, text]) => (
                  <div key={lang} className="space-y-1">
                    <h4 className="font-semibold text-sm text-muted-foreground">{languages.find(l => l.code === lang)?.name || lang}</h4>
                    <p className="text-foreground">{text}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
