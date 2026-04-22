import { useState, useEffect } from "react";
import { dashboardApi } from "@/api/dashboard.service";

type Step = {
  phase: string;
  duration: number;
  instruction: string;
};

type Exercise = {
  _id: string;
  name: string;
  description: string;
  steps: Step[];
  totalCycles: number;
  totalDuration: number;
};

export default function BreathingExercise() {
  const [open, setOpen] = useState<boolean>(false);
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [currentCycle, setCurrentCycle] = useState<number>(1);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setExercise(null);
    setIsRunning(false);
    setCurrentStepIndex(0);
    setTimeLeft(0);
    setError("");
    setCurrentCycle(1);
  };

  useEffect(() => {
    if (!open) return;

    const fetchExercise = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await dashboardApi.getExercise("patient");

        const raw = res?.data;
        const exercises = raw?.data?.exercises || raw?.exercises || [];

        const ex: Exercise | undefined = exercises[0];

        if (!ex) {
          throw new Error("No exercise found");
        }

        setExercise(ex);
      } catch (err) {
        setError("Failed to load breathing exercise");
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [open]);

  useEffect(() => {
    if (exercise && exercise.steps?.length) {
      setTimeLeft(exercise.steps[0].duration);
    }
  }, [exercise]);

  const startExercise = () => {
    if (!exercise || !exercise.steps?.length) return;
    setIsRunning(true);
    setCurrentStepIndex(0);
    setTimeLeft(exercise.steps[0].duration);
    setCurrentCycle(1);
  };

  const pauseExercise = () => {
    setIsRunning(false);
  };

  const resumeExercise = () => {
    if (!exercise) return;
    setIsRunning(true);
  };

  const resetExercise = () => {
    if (!exercise || !exercise.steps?.length) return;
    setIsRunning(false);
    setCurrentStepIndex(0);
    setTimeLeft(exercise.steps[0].duration);
    setCurrentCycle(1);
  };

  useEffect(() => {
    if (!isRunning || !exercise?.steps?.length) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) return prev - 1;

        setCurrentStepIndex((prevIndex) => {
          const nextStep = prevIndex + 1;

          if (nextStep < exercise.steps.length) {
            setTimeLeft(exercise.steps[nextStep].duration);
            return nextStep;
          } else {
            setCurrentCycle((cycle) => {
              if (exercise && cycle < exercise.totalCycles) {
                return cycle + 1;
              }
              return cycle;
            });

            setTimeLeft(exercise.steps[0].duration);
            return 0;
          }
        });

        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, exercise]);

  const remainingCycles = exercise
    ? exercise.totalCycles - currentCycle
    : 0;

  return (
    <>
      <button
        onClick={openModal}
        className="w-full py-3 text-white rounded-xl bg-gradient-dash"
      >
        Start Breathing Exercise
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="w-100 bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {exercise?.name || "Breathing Exercise"}
              </h2>
              <button onClick={closeModal}>✕</button>
            </div>

            {loading && <p>Loading...</p>}

            {!loading && error && (
              <p className="text-red-500 mb-3">{error}</p>
            )}

            {!loading && !error && exercise && (
              <>
                <p className="text-gray-600 mb-4">
                  {exercise.description}
                </p>

                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold capitalize">
                    {exercise.steps?.[currentStepIndex]?.phase}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {exercise.steps?.[currentStepIndex]?.instruction}
                  </p>
                  <div className="text-4xl font-bold mt-2">
                    {timeLeft}s
                  </div>
                </div>

                <div className="text-sm text-gray-500 mb-1">
                  Cycle: {currentCycle} / {exercise.totalCycles}
                </div>

                  <div className="text-sm text-gray-500 mb-4">
                  Total Duration: {exercise.totalDuration}s
                </div>

                <div className="flex gap-2">
                  {!isRunning ? (
                    <button
                      onClick={
                        timeLeft === exercise.steps[0].duration
                          ? startExercise
                          : resumeExercise
                      }
                      className="flex-1 py-2 bg-gradient-dash text-white rounded-lg"
                    >
                      {timeLeft === exercise.steps[0].duration
                        ? "Start"
                        : "Resume"}
                    </button>
                  ) : (
                    <button
                      onClick={pauseExercise}
                      className="flex-1 py-2 bg-gradient-dash text-white rounded-lg"
                    >
                      Pause
                    </button>
                  )}

                  <button
                    onClick={resetExercise}
                    className="flex-1 py-2 bg-gray-400 text-white rounded-lg"
                  >
                    Reset
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}