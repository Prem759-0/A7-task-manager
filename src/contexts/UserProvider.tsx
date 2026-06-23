import { useEffect } from "react";
import { defaultUser } from "../constants/defaultUser";
import { useStorageState } from "../hooks/useStorageState";
import { User } from "../types/user";
import { UserContext } from "./UserContext";

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useStorageState<User>(defaultUser, "user");

  // Ensure default settings are applied if missing
  useEffect(() => {
    if (!user.settings || !user.categories || user.xp === undefined) {
      setUser((prevUser) => ({
        ...defaultUser,
        ...prevUser,
        settings: {
          ...defaultUser.settings,
          ...(prevUser.settings || {}),
        },
        xp: prevUser.xp ?? defaultUser.xp,
        streak: prevUser.streak ?? defaultUser.streak,
      }));
    }
  }, [user, setUser]);

  // Use a safely merged object for the context value so renders don't crash before useEffect fires
  const safeUser = {
    ...defaultUser,
    ...user,
    settings: {
      ...defaultUser.settings,
      ...(user?.settings || {}),
    },
  };

  return (
    <UserContext.Provider value={{ user: safeUser, setUser }}>{children}</UserContext.Provider>
  );
};
