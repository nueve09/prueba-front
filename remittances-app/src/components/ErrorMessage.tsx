import { useRemittanceStore } from "../store/useRemittanceStore";

export default function ErrorMessage() {
  const error = useRemittanceStore((state) => state.error);
  const clearError = useRemittanceStore((state) => state.clearError);

  if (!error) return null;
  return (
    <div className="absolute top-4 left-1/2 bg-red-100 text-red-700 p-2 rounded mb-4 flex justify-between items-center">
      <span>{error}</span>
      <button onClick={clearError} className="font-bold">
        ×
      </button>
    </div>
  );
}
