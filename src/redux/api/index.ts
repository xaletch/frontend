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
    "DeleteCartNote",
    "DeleteSearch",
  ],
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
      invalidatesTags: [{ type: "CheckAuth", id: "LIST" }],
    }),
    // АВТОРИЗАЦИЯ
    fetchLogin: builder.mutation({
      query: (body) => ({
        url: "/api/user/login",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "CheckAuth", id: "LIST" }],
    }),
    // ИНФОРМАЦИЯ О ПОЛЬЗОВАТЕЛЕ
    getUserInfo: builder.query({
      query: () => ({
        url: "/api/user/account",
        method: "GET",
      }),
      providesTags: ["CheckAuth"],
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
    // ПОЛУЧЕНИЕ ЗАМЕТКИ ПО ID
    getOneNote: builder.mutation({
      query: (id: string) => ({
        url: `/api/notes/oneNote/${id}`,
        method: "GET",
      }),
    }),
    // ИЗМЕНЕНИЕ ИМЕНИ ЗАМЕТКИ ПО ID
    patchUpdateNote: builder.mutation({
      query: (args: { id: string; data: any }) => ({
        url: `/api/notes/update/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: [{ type: "CreateNote", id: "LIST" }],
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
    }),
    // УДАЛЕНИЕ ЗАМЕТКИ БЕЗ ВОЗМОЖНОСТИ НА ВОССТАНОВЛЕНИЕ
    fetchDeleteNote: builder.mutation({
      query: (id: string) => ({
        url: `/api/notes/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "DeleteCartNote", id: "LIST" },
        { type: "DeleteSearch", id: "LIST" },
      ],
    }),
    // ВОССТАНОВЛЕНИЕ ЗАМЕТКИ ИЗ КОРЗИНЫ
    fetchRecoveryNote: builder.mutation({
      query: (id: string) => ({
        url: `/api/notes/recovery/${id}`,
        method: "POST",
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
      providesTags: (result: any) =>
        result
          ? [
              ...result.map(({ id }: { id: string }) => ({
                type: "DeleteSearch" as const,
                id,
              })),
              { type: "DeleteSearch", id: "LIST" },
            ]
          : [{ type: "DeleteSearch", id: "LIST" }],
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
  // useGetOneNoteQuery,
  useGetOneNoteMutation,
  usePatchUpdateNoteMutation,
  useFetchAddNoteCartMutation,
  useFetchRecoveryNoteMutation,
  useFetchDeleteNoteMutation,
  useFetchUploadImageMutation,
  useLazyGetSearchNotesQuery,
} = noteApi;
