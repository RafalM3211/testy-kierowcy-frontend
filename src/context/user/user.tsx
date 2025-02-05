import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import type { User } from "../../types/globalTypes";
import { useQuery } from "@tanstack/react-query";
import { checkToken } from "../../core/services/user";
import Loader from "../../components/patterns/Loader/Loader";

interface Props {
  children: ReactNode;
}

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function useUserContext() {
  const contextValue = useContext(UserContext);

  if (!contextValue) {
    throw new Error("do not use user context outside provider");
  }

  return contextValue;
}

export default function UserProvider(props: Props) {
  const [user, setUser] = useState<User | null>(null);
  const isLoggedIn = !!user;

  const { data, isLoading, isError, isFetched } = useQuery({
    queryKey: ["checkToken"],
    queryFn: checkToken,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
  });

  useEffect(() => {
    if (!isError && !isLoading) {
      setUser(data);
    }
  }, [data, isError, isLoading, setUser]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn }}>
      {isLoading || !isFetched ? <Loader /> : props.children}
    </UserContext.Provider>
  );
}
