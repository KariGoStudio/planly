"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations("LoginPage");

  function handleEnter() {
    localStorage.setItem("dev_mode", "true");
    localStorage.setItem(
      "dev_user",
      JSON.stringify({ id: "dev-user-a", email: "dev@planly.local" })
    );
    router.push("/couple");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-rose-50 to-pink-50 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm flex flex-col items-center">
        <div className="text-7xl mb-5 animate-float select-none">💛</div>

        <h1 className="text-4xl font-bold text-gray-800 tracking-tight mb-2">
          Planly
        </h1>

        <p className="text-gray-400 text-base text-center leading-relaxed mb-3">
          {t("subtitleLine1")}
        </p>
        <p className="text-gray-500 text-base text-center font-medium mb-12">
          {t("subtitleLine2")}
        </p>

        <div className="w-full space-y-2.5 mb-10">
          {[
            { emoji: "🌈", text: t("featureMood") },
            { emoji: "🎴", text: t("featureSwipe") },
            { emoji: "💛", text: t("featureMatch") }
          ].map((f) => (
            <div
              key={f.text}
              className="flex items-center gap-3 bg-white/70 rounded-2xl px-4 py-3 shadow-sm"
            >
              <span className="text-xl">{f.emoji}</span>
              <span className="text-sm text-gray-600 font-medium">
                {f.text}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={handleEnter}
          className="w-full py-4 rounded-2xl bg-gray-800 text-white font-bold text-base shadow-lg active:scale-[0.97] transition-all duration-150 animate-slide-up"
        >
          {t("enterButton")}
        </button>

        <p className="text-gray-300 text-xs mt-5 text-center">
          {t("noAccount")}
        </p>
      </div>
    </div>
  );
}