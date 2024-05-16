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
  tagTypes: [
    "CreateNote",
    "CheckAuth",
    "UpdateNote",
    "CartNote",
    "DeleteSearch",
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
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
      invalidatesTags: [{ type: "CheckAuth", id: "ACCOUNT" }],
    }),
    // АВТОРИЗАЦИЯ
    fetchLogin: builder.mutation({
      query: (body) => ({
        url: "/api/user/login",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "CheckAuth", id: "ACCOUNT" }],
    }),
    // ИНФОРМАЦИЯ О ПОЛЬЗОВАТЕЛЕ
    getUserInfo: builder.query({
      query: () => ({
        url: "/api/user/account",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [{ type: "CheckAuth", id: "ACCOUNT" }]
          : [{ type: "CheckAuth", id: "ACCOUNT" }],
    }),
    // ПОЛУЧЕНИЕ ВСЕХ ЗАМЕТОК
    getNotes: builder.query({
      query: () => ({
        url: "/api/notes",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: string }) => ({
                type: "CreateNote" as const,
                id,
              })),
              { type: "CreateNote", id: "LIST" },
            ]
          : [{ type: "CreateNote", id: "LIST" }],
    }),
    // СОЗДАНИЕ ЗАМЕТКИ
    fetchCreateNotes: builder.mutation({
      query: () => ({
        url: "/api/notes/save",
        method: "POST",
      }),
      invalidatesTags: [{ type: "CreateNote", id: "LIST" }],
    }),
    fetchCreateSubNote: builder.mutation({
      query: (id: string) => ({
        url: `/api/notes/subnote/${id}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "CreateNote", id: "LIST" }],
    }),
    // ПОЛУЧЕНИЕ ЗАМЕТКИ ПО ID
    getOneNote: builder.query({
      query: (id: string) => ({
        url: `/api/notes/oneNote/${id}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "UpdateNote", id: result.id },
              { type: "UpdateNote", id: "CONTENT" },
            ]
          : [{ type: "UpdateNote", id: "CONTENT" }],
    }),
    // ИЗМЕНЕНИЕ ИМЕНИ ЗАМЕТКИ ПО ID
    patchUpdateNote: builder.mutation({
      query: (args: { id: string; data: any }) => ({
        url: `/api/notes/update/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: [
        { type: "CreateNote", id: "LIST" },
        { type: "UpdateNote", id: "CONTENT" },
      ],
    }),
    // ДОБАВЛЕНИЕ ЗАМЕТКИ В КОРЗИНУ
    fetchAddNoteCart: builder.mutation({
      query: (id: string) => ({
        url: `/api/notes/add-to-cart/${id}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "CreateNote", id: "LIST" }],
    }),
    // ПОЛУЧЕНИЕ ЗАМЕТОК В КОРЗИНЕ
    GetCartNotes: builder.query({
      query: () => ({
        url: "/api/notes/cart/note",
        method: "GET",
      }),
      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map(({ id }: { id: string }) => ({
                type: "CartNote" as const,
                id,
              })),
              { type: "CartNote", id: "LIST" },
            ]
          : [{ type: "CartNote", id: "LIST" }],
    }),
    // УДАЛЕНИЕ ЗАМЕТКИ БЕЗ ВОЗМОЖНОСТИ НА ВОССТАНОВЛЕНИЕ
    fetchDeleteNote: builder.mutation({
      query: (id: string) => ({
        url: `/api/notes/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "CartNote", id: "LIST" }],
    }),
    // ВОССТАНОВЛЕНИЕ ЗАМЕТКИ ИЗ КОРЗИНЫ
    fetchRecoveryNote: builder.mutation({
      query: (id: string) => ({
        url: `/api/notes/recovery/${id}`,
        method: "POST",
      }),
      invalidatesTags: [
        { type: "CreateNote", id: "LIST" },
        { type: "CartNote", id: "LIST" },
      ],
    }),
    // ЗАГРУЗКА КАРТИНОК
    fetchUploadImage: builder.mutation({
      query: (imageUrl: any) => ({
        url: "/api/uploads",
        method: "POST",
        body: imageUrl,
      }),
      invalidatesTags: [
        { type: "CreateNote", id: "LIST" },
        { type: "UpdateNote", id: "CONTENT" },
      ],
    }),
    // ПОИСК ЗАМЕТОК ПО ИМЕНИ
    getSearchNotes: builder.query({
      query: (name: string) => ({
        url: `/api/notes/search/${name}`,
        method: "GET",
      }),
    }),
    getSearchNotesCart: builder.query({
      query: (name: string) => ({
        url: `/api/notes/search/cart/${name}`,
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
  useLazyGetUserInfoQuery,
  useGetNotesQuery,
  useFetchCreateNotesMutation,
  useFetchCreateSubNoteMutation,
  // useGetOneNoteQuery,
  useLazyGetOneNoteQuery,
  // useGetOneNoteMutation,
  usePatchUpdateNoteMutation,
  useFetchAddNoteCartMutation,
  useFetchRecoveryNoteMutation,
  useFetchDeleteNoteMutation,
  useFetchUploadImageMutation,
  useLazyGetSearchNotesQuery,
  useLazyGetSearchNotesCartQuery,
} = noteApi;
