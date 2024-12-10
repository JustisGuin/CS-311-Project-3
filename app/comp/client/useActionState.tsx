import { useState } from "react";

type ActionFunction<T> = (data: T) => Promise<void>;

function useActionState<T>(action: ActionFunction<T>, initialState: T) {
  const [state, setState] = useState(initialState);
  const [isPending, setIsPending] = useState(false);
  const [serverErrors, setServerErrors] = useState<Partial<Record<string, string>>>({});

  const dispatch = async (payload: T) => {
    setIsPending(true);
    setServerErrors({}); // Reset errors before action
    try {
      await action(payload);
      setState(initialState); // Reset state after successful action
    } catch (error) {
      if (error instanceof Error) {
        setServerErrors({ name: error.message }); // Example of setting an error
      }
      console.error("Action failed:", error);
    } finally {
      setIsPending(false);
    }
  };

  return [serverErrors, dispatch, isPending] as const;
}

export default useActionState;