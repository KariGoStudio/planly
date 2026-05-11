"use client";

interface Props {
  activeUser: "A" | "B";
  onToggle: (user: "A" | "B") => void;
  className?: string;
}

export default function CoupleToggle({ activeUser, onToggle, className = "" }: Props) {
  return (
    <div className={`bg-gray-100/80 rounded-2xl p-1 flex ${className}`}>
      {(["A", "B"] as const).map((user) => (
        <button
          key={user}
          onClick={() => onToggle(user)}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            activeUser === user
              ? "bg-white text-gray-800 shadow-sm"
              : "text-gray-400 hover:text-gray-500"
          }`}
        >
          {user === "A" ? "💛 You" : "🤍 Partner"}
        </button>
      ))}
    </div>
  );
}
