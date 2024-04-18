import uuid from "react-native-uuid";

export const generateStringUUID = () => uuid.v4().toString();

export const findIndexById = (articles: IArticle[], id: string) => {
  let index = -1;
  if (!articles) return -1;
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].id === id) {
      index = i;
      break;
    }
  }

  return index;
};
