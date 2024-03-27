import { LoginForm } from "../entities/auth/LoginForm";
import { createFileRoute } from "@tanstack/react-router";
import { useSessionStore } from "../store/sessionStore";

export const Route = createFileRoute("/login")({
	component: () => {
		const state = useSessionStore.getState();
		return state.token ? (location.href = "/") : <LoginForm />;
	},
});
