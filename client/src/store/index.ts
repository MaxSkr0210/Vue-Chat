import { createStore } from "vuex";
import { UserType } from "@/types/UserType";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.withCredentials = true;

export default createStore({
  state: {
    user: {} as UserType,
    users: [] as UserType[],
    rooms: [],
  },
  getters: {
    getUser(state): UserType {
      return state.user;
    },
    getUsers(state): UserType[] {
      return state.users;
    },
    getRooms(state) {
      return state.rooms;
    },
  },
  mutations: {
    setUser(state, user: UserType) {
      state.user = user;
    },
    setUsers(state, users: UserType[]) {
      state.users = users;
    },
    setRooms(state, rooms) {
      state.rooms = rooms;
    },
  },
  actions: {
    async SignUp({ commit }, user: UserType) {
      const newUser = await axios.post("/signup", user);
      commit("setUser", newUser.data);
    },

    async SignIn({ commit }, user: { email: string; password: string }) {
      const newUser = await axios.post("/signin", user);
      commit("setUser", newUser.data);
    },
    async signOut({ commit }) {
      await axios.delete("/signout");
      commit("setUser", {} as UserType);
    },
    async fetchUsers({ commit }) {
      const users = await axios.get("/api/users");
      commit("setUsers", users.data);
    },
    async getUser({ commit }) {
      const user = await axios.get("/api/users/session");
      commit("setUser", user.data);
    },
    async fetchRooms({ commit }) {
      const room = await axios.get("/api/rooms");
      commit("setRooms", room.data);
    },
    async findRooms({ commit }, name: string) {
      const room = await axios.get(`/api/rooms?name=${name}`);
      commit("setRooms", room.data);
    },
    async InviteUser({ commit }, ...args: any[]) {
      const user = args[0];
      const room = args[1];

      await axios.post(`/api/rooms/${room.id}`, user);
    },
  },
});
