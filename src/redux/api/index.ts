import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

function getCookieValue(name: string) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

export const noteApi = createApi({
  reducerPath: "noteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
    prepareHeaders: (headers, { getState }) => {
      const token = getCookieValue("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // РЕГИСТРАЦИЯ
    fetchRegister: builder.mutation({
      query: (body) => ({
        url: "/api/user/register",
        method: "POST",
        body,
      }),
    }),
    // АВТОРИЗАЦИЯ
    fetchLogin: builder.mutation({
      query: (body) => ({
        url: "/api/user/login",
        method: "POST",
        body,
      }),
    }),
    // ИНФОРМАЦИЯ О ПОЛЬЗОВАТЕЛЕ
    getUserInfo: builder.query({
      query: () => ({
        url: "/api/user/account",
        method: "GET",
      }),
    }),
    // ПОЛУЧЕНИЕ ВСЕХ ЗАМЕТОК
    getNotes: builder.query({
      query: () => ({
        url: "/api/notes",
        method: "GET",
      }),
    }),
    // СОЗДАНИЕ ЗАМЕТКИ
    fetchCreateNotes: builder.mutation({
      query: () => ({
        url: "/api/notes/save",
        method: "POST",
      }),
    }),
    // ПОЛУЧЕНИЕ ЗАМЕТКИ ПО ID
    getOneNote: builder.query({
      query: (id: string) => ({
        url: `/api/notes/oneNote/${id}`,
        method: "GET",
      }),
    }),
    // ИЗМЕНЕНИЕ ИМЕНИ ЗАМЕТКИ ПО ID
    patchUpdateNote: builder.mutation({
      query: (args: { id: string; newName: string }) => ({
        url: `/api/notes/update/${args.id}`,
        method: "PATCH",
        body: { name: args.newName },
      }),
    }),
    // ДОБАВЛЕНИЕ ЗАМЕТКИ В КОРЗИНУ
    fetchAddNoteCart: builder.mutation({
      query: (id: string) => ({
        url: `/api/notes/add-to-cart/${id}`,
        method: "POST",
      }),
    }),
    // ПОЛУЧЕНИЕ ЗАМЕТОК В КОРЗИНЕ
    GetCartNotes: builder.query({
      query: () => ({
        url: "/api/notes/cart/note",
        method: "GET",
      }),
    }),
    // ВОССТАНОВЛЕНИЕ ЗАМЕТКИ ИЗ КОРЗИНЫ
    fetchRecoveryNote: builder.mutation({
      query: (id: string) => ({
        url: `/api/notes/recovery/${id}`,
        method: "POST",
      }),
    }),
    // УДАЛЕНИЕ ЗАМЕТКИ БЕЗ ВОЗМОЖНОСТИ НА ВОССТАНОВЛЕНИЕ
    fetchDeleteNote: builder.mutation({
      query: (id: string) => ({
        url: `/api/notes/delete/${id}`,
        method: "DELETE",
      }),
    }),
    // ЗАГРУЗКА КАРТИНОК
    fetchUploadImage: builder.mutation({
      query: () => ({
        url: "/api/uploads",
        method: "POST",
      }),
    }),
    // ПОИСК ЗАМЕТОК ПО ИМЕНИ
    getSearchNotes: builder.query({
      query: (name: string) => ({
        url: `/api/notes/search/${name}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useGetCartNotesQuery } = noteApi;
export const {
  useFetchRegisterMutation,
  useFetchLoginMutation,
  useGetUserInfoQuery,
  useGetNotesQuery,
  useFetchCreateNotesMutation,
  useGetOneNoteQuery,
  usePatchUpdateNoteMutation,
  useFetchAddNoteCartMutation,
  useFetchRecoveryNoteMutation,
  useFetchDeleteNoteMutation,
  useFetchUploadImageMutation,
  useGetSearchNotesQuery,
} = noteApi;
