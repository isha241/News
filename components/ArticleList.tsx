import React, { ReactNode } from "react";
import { Animated, ScrollView } from "react-native";
import ArticleItem from "./ArticleItem";

interface ArticleListProps {
  articles: IArticle[];
  renderRightActions: (
    dragX: Animated.AnimatedInterpolation<string | number>
  ) => ReactNode;
  renderLeftActions: (
    dragX: Animated.AnimatedInterpolation<string | number>,
    article: IArticle
  ) => ReactNode;
  handleDeleteArticle: (id: string) => void;
  handlePinArticle: (id: string) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  renderRightActions,
  renderLeftActions,
  handleDeleteArticle,
  handlePinArticle,
}) => {
  return (
    <ScrollView style={{ flex: 1, padding: 15 }}>
      {articles.length > 0 &&
        articles.map((article, index) => (
          <ArticleItem
            key={article.id}
            index={index}
            article={article}
            handlePinArticle={handlePinArticle}
            handleDeleteArticle={handleDeleteArticle}
            renderRightActions={renderRightActions}
            renderLeftActions={renderLeftActions}
          />
        ))}
    </ScrollView>
  );
};

export default ArticleList;
