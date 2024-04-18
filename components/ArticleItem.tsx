import React from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
} from "react-native";

const Article = ({
  article,
  index,
  handleDeleteArticle,
  handlePinArticle,
  renderRightActions,
  renderLeftActions,
}: {
  article: IArticle;
  index: number;
  handleDeleteArticle: (id: string) => void;
  handlePinArticle: (id: string) => void;
  renderRightActions: (
    progress: any,
    dragX: any,
    index: number
  ) => React.ReactNode;
  renderLeftActions: (
    progress: any,
    dragX: any,
    article: IArticle
  ) => React.ReactNode;
}) => (
  <TouchableWithoutFeedback key={index}>
    <Swipeable
      key={article.id}
      renderRightActions={(progress, dragX) =>
        renderRightActions(progress, dragX, index)
      }
      renderLeftActions={(progress, dragX) =>
        renderLeftActions(progress, dragX, article)
      }
      onSwipeableOpen={(direction) => {
        if (direction === "right") {
          handleDeleteArticle(article.id);
        }
        if (direction === "left") {
          handlePinArticle(article.id);
        }
      }}
    >
      <View style={[styles.content, styles.swipedContent]} key={article.id}>
        <Image
          source={
            article.urlToImage
              ? { uri: article.urlToImage }
              : require("../assets/splashGif.gif")
          }
          style={{ width: 80, height: 80 }}
          width={80}
          height={80}
        />
        <Text style={{ marginLeft: 10 }} ellipsizeMode="tail" numberOfLines={2}>
          {article.title}
        </Text>
        {article.isPinned && (
          <Image
            source={require("../assets/icons/pinIcon.png")}
            style={{
              width: 20,
              height: 20,
              display: "flex",
              justifyContent: "flex-end",
            }}
          />
        )}
      </View>
    </Swipeable>
  </TouchableWithoutFeedback>
);

export default Article;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ffffff",
  },
  swipedContent: {
    backgroundColor: "#fff",
    display: "flex",
    width: 250,
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10,
    alignItems: "center", // Change the background color when swiped
  },
  rightAction: {
    backgroundColor: "#dd2c00",
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
  },
  leftAction: {
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    padding: 20,
  },
  scrollView: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
  },
});
