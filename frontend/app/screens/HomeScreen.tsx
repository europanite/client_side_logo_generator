// frontend/app/screens/HomeScreen.tsx
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Linking
} from "react-native";

type ColorTheme = {
  background: string;
  outline: string;
  mainPalette: string[];
  subtitle: string;
  tagBackground: string;
  tagText: string;
};

const COLOR_THEMES: ColorTheme[] = [
  {
    // Inspired by the sample logo: pink + orange + green + blue
    background: "#ffffff",
    outline: "#ff66aa",
    mainPalette: ["#ff5bbd", "#ffa726", "#7cc74c", "#29b6f6"],
    subtitle: "#ff5bbd",
    tagBackground: "#ff5bbd",
    tagText: "#ffffff",
  },
  {
    background: "#fff8e1",
    outline: "#ff7043",
    mainPalette: ["#ff7043", "#ffca28", "#66bb6a", "#42a5f5"],
    subtitle: "#5d4037",
    tagBackground: "#ffffff",
    tagText: "#ff7043",
  },
  {
    background: "#f3e5f5",
    outline: "#ab47bc",
    mainPalette: ["#ec407a", "#ab47bc", "#29b6f6", "#66bb6a"],
    subtitle: "#6a1b9a",
    tagBackground: "#ffffff",
    tagText: "#ab47bc",
  },
  {
    background: "#e3f2fd",
    outline: "#1976d2",
    mainPalette: ["#ff5bbd", "#ffb74d", "#66bb6a", "#1976d2"],
    subtitle: "#1976d2",
    tagBackground: "#ffffff",
    tagText: "#1976d2",
  },
];

function pickNextTheme(current: ColorTheme): ColorTheme {
  const index = COLOR_THEMES.findIndex((t) => t === current);
  if (index === -1) return COLOR_THEMES[0];
  const nextIndex = (index + 1) % COLOR_THEMES.length;
  return COLOR_THEMES[nextIndex];
}

type ButtonProps = {
  label: string;
  onPress: () => void;
};

function PrimaryButton({ label, onPress }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
    >
      <Text style={styles.buttonLabel}>{label}</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isNarrow = width < 480;

  const [mainText, setMainText] = useState<string>("Hello World");
  const [subtitleText, setSubtitleText] = useState<string>("Hello World");
  const [tagText, setTagText] = useState<string>("Ver 01");

  const [theme, setTheme] = useState<ColorTheme>(COLOR_THEMES[0]);
  const [isInverted, setIsInverted] = useState<boolean>(false);

  const mainChars = useMemo(() => Array.from(mainText), [mainText]);

  const previewBackground = isInverted
    ? theme.mainPalette[0]
    : theme.background;

  const previewOutline = theme.outline;

  const charColor = (index: number): string => {
    const palette = theme.mainPalette;
    const baseColor = palette[index % palette.length];
    if (isInverted) {
      return theme.background;
    }
    return baseColor;
  };

  const subtitleColor = isInverted ? theme.background : theme.subtitle;
  const tagBackground = isInverted ? theme.background : theme.tagBackground;
  const tagTextColor = isInverted ? theme.mainPalette[0] : theme.tagText;

  const REPO_URL = "https://github.com/europanite/client_side_logo_generator";

  return (
    <ScrollView
      contentContainerStyle={[
        styles.root,
        { paddingHorizontal: isNarrow ? 16 : 24 },
      ]}
    >
      <TouchableOpacity onPress={() => Linking.openURL(REPO_URL)}>
        <Text style={styles.title}>Logo Generator</Text>
      </TouchableOpacity>
      <View
        style={[
          styles.previewOuter,
          {
            backgroundColor: previewBackground,
          },
        ]}
      >
        <View style={styles.previewInner}>
          {/* Main multicolor text */}
          <View style={styles.mainRow}>
            {mainChars.map((ch, index) => (
              <Text
                key={`${ch}-${index}`}
                style={[
                  styles.mainChar,
                  {
                    color: charColor(index),
                    textShadowColor: previewOutline,
                    fontSize: isNarrow ? 56 : 80,
                  },
                ]}
              >
                {ch === " " ? "\u00A0" : ch}
              </Text>
            ))}
          </View>

          {/* Subtitle (curved-like arc by simple spacing) */}
          {subtitleText.trim().length > 0 && (
            <Text
              style={[
                styles.subtitle,
                {
                  color: subtitleColor,
                },
              ]}
            >
              {subtitleText}
            </Text>
          )}

          {/* Tag box in the corner */}
          {tagText.trim().length > 0 && (
            <View style={styles.tagRow}>
              <View
                style={[
                  styles.tagBox,
                  {
                    backgroundColor: tagBackground,
                    borderColor: previewOutline,
                  },
                ]}
              >
                <Text style={[styles.tagText, { color: tagTextColor }]}>
                  {tagText}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <Text style={styles.sectionTitle}>Logo Text</Text>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Main text</Text>
          <TextInput
            value={mainText}
            onChangeText={setMainText}
            placeholder="Main logo text"
            style={styles.input}
          />
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Subtitle</Text>
          <TextInput
            value={subtitleText}
            onChangeText={setSubtitleText}
            placeholder="Subtitle (optional)"
            style={styles.input}
          />
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Tag text</Text>
          <TextInput
            value={tagText}
            onChangeText={setTagText}
            placeholder="Tag text (optional)"
            style={styles.input}
          />
        </View>

        <View
          style={[
            styles.buttonsRow,
            { flexDirection: isNarrow ? "column" : "row" },
          ]}
        >
          <PrimaryButton
            label="Next color theme"
            onPress={() => setTheme((current) => pickNextTheme(current))}
          />
          <PrimaryButton
            label={isInverted ? "Normal colors" : "Invert background/text"}
            onPress={() => setIsInverted((prev) => !prev)}
          />
        </View>

        <Text style={styles.helperText}>
          Tip: To get a strong pop style, keep the main text short and use
          round characters. You can also separate parts of the text with spaces
          to control the rhythm.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingTop: 24,
    paddingBottom: 32,
    gap: 24,
  },
  title: {
    fontSize: 32,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#94A3B8",
    marginBottom: 8,
    textDecorationLine: "underline",
  },
  previewOuter: {
    borderRadius: 24,
    padding: 16,
    shadowColor: "#000000",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 4,
  },
  previewInner: {
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
  mainRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 8,
  },
  mainChar: {
    fontWeight: "900",
    letterSpacing: 2,
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 2,
    marginTop: 4,
    marginBottom: 12,
    transform: [{ translateY: 2 }],
  },
  tagRow: {
    width: "100%",
    alignItems: "flex-end",
  },
  tagBox: {
    borderRadius: 12,
    borderWidth: 3,
    paddingVertical: 4,
    paddingHorizontal: 12,
    transform: [{ rotate: "-8deg" }],
  },
  tagText: {
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 1,
  },
  controls: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
  },
  fieldBlock: {
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    opacity: 0.8,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: "#ffffff",
  },
  buttonsRow: {
    gap: 12,
    alignItems: "stretch",
    justifyContent: "center",
  },
  button: {
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#ff5bbd",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  buttonPressed: {
    transform: [{ translateY: 1 }],
    opacity: 0.8,
  },
  buttonLabel: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 15,
  },
  helperText: {
    fontSize: 12,
    opacity: 0.7,
  },
});
