import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { findIndexById } from "../utils";

type TNewsState = {
  articles: IArticle[];
  topArticles: IArticle[];
  pinnedArticles: IArticle[];
  loading: boolean;
};

const initialState: TNewsState = {
  articles: [],
  topArticles: [],
  pinnedArticles: [],
  loading: true,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    updateNewsArticles: (
      state,
      action: { type: string; payload: IArticle[] }
    ) => {
      state.articles = action.payload;
    },
    deleteArticle: (state, action: { type: string; payload: string }) => {
      const isPinnedIndex = findIndexById(state.pinnedArticles, action.payload);
      if (isPinnedIndex >= 0) {
        state.pinnedArticles = state.pinnedArticles.filter(
          (article) => article.id !== action.payload
        );
      } else {
        state.articles = state.articles.filter(
          (article) => article.id !== action.payload
        );
      }
    },
    setLoading: (state, action: { type: string; payload: boolean }) => {
      state.loading = action.payload;
    },
    toggleArticlePin: (state, action: { type: string; payload: string }) => {
      const pinnedArticlesIndex = findIndexById(
        state.pinnedArticles,
        action.payload
      );
      if (pinnedArticlesIndex >= 0) {
        // Item is pinned; Should unpin
        const pinnedArticle = state.pinnedArticles[pinnedArticlesIndex];
        state.pinnedArticles.splice(pinnedArticlesIndex, 1);
        state.articles.push(pinnedArticle);
      } else {
        // Item is not pinned; Should pin
        const articleIndex = findIndexById(state.articles, action.payload);
        if (articleIndex >= 0) {
          state.pinnedArticles = [
            state.articles[articleIndex],
            ...(state.pinnedArticles ?? []),
          ];

          state.articles.splice(articleIndex, 1);
        }
      }
    },
    refreshTopArticles: (state) => {
      const getRandomIndex = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };

      // Get 5 random indexes
      const randomIndexes = Array.from({ length: 5 }, () =>
        getRandomIndex(0, state.articles.length - 1)
      );

      // Use reduce to fetch titles for the random indexes
      const articles = randomIndexes.reduce((acc: IArticle[], currentIndex) => {
        // Check if the index is within the array bounds
        if (currentIndex >= 0 && currentIndex < state.articles.length) {
          acc.push(state.articles[currentIndex]);
        }
        return acc;
      }, []);

      state.topArticles = articles;
    },
    clearArticles: (state) => {
      state.articles = initialState.articles;
    },
    reset: (state) => {
      AsyncStorage.clear();
      state = { ...initialState };
    },
  },
});

export const {
  updateNewsArticles,
  clearArticles,
  refreshTopArticles,
  reset,
  setLoading,
  toggleArticlePin,
  deleteArticle,
} = newsSlice.actions;

export const newsReducer = newsSlice.reducer;
