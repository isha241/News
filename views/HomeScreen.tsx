import React, { ReactNode, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
  FlatList,
} from "react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  deleteArticle,
  refreshTopArticles,
  toggleArticlePin,
  updateNewsArticles,
} from "../store/news";
import { generateStringUUID } from "../utils/helpers";
import axiosInstance from "../api/axios";

export default function HomeScreen() {
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const news = useSelector((store: RootState) => store.news);
  const dispatch = useDispatch();

  const headlines = [
    ...(news.pinnedArticles?.length > 0
      ? news.pinnedArticles.map((item) => {
          return { ...item, isPinned: true };
        })
      : []),
    ...(news.articles?.length > 0
      ? news.articles.map((item) => {
          return { ...item, isPinned: false };
        })
      : []),
  ];

  const fetchNewArticles = async () => {
    const response = await axiosInstance.get(
      "/v2/everything?q=health&apiKey=477a66c5e50849d7af0b7e31a2bdbb06&pageSize=50"
    );
    dispatch(
      updateNewsArticles(
        response.data.articles.map((item: IArticle) => {
          return { ...item, id: generateStringUUID() };
        })
      )
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(refreshTopArticles());
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (headlines.length === 0) {
      fetchNewArticles();
    }
  }, [headlines]);

  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnimation]);

  const renderRightActions = (
    dragX: Animated.AnimatedInterpolation<string | number>
  ): ReactNode => {
    const trans = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 100],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.rightAction}>
        <Animated.Text
          style={[styles.actionText, { transform: [{ translateX: trans }] }]}
        >
          Delete
        </Animated.Text>
      </View>
    );
  };

  const renderLeftActions = (
    dragX: Animated.AnimatedInterpolation<string | number>,
    article: IArticle
  ): ReactNode => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [100, 0],
      extrapolate: "clamp",
    });
    return (
      <View style={styles.leftAction}>
        <Animated.Text
          style={[styles.actionText, { transform: [{ translateX: trans }] }]}
        >
          {article.isPinned ? "Unpin" : "Pin"}
        </Animated.Text>
      </View>
    );
  };

  const Item = React.memo(
    ({ article, index }: { article: IArticle; index: number }) =>
      article.urlToImage && (
        <TouchableWithoutFeedback key={index}>
          <Swipeable
            key={article.id}
            renderRightActions={(progress, dragX) =>
              renderRightActions(progress)
            }
            renderLeftActions={(dragX) => renderLeftActions(dragX, article)}
            onSwipeableOpen={(direction) => {
              if (direction === "right") {
                dispatch(deleteArticle(article.id));
              }
              if (direction === "left") {
                dispatch(toggleArticlePin(article.id));
              }
            }}
          >
            <View
              style={{
                marginTop: 10,
                flex: 1,
                // display: "flex",
                flexDirection: "row",
                width: 260,
                alignItems: "center",
                paddingLeft: 15,
                paddingRight: 15,
              }}
              key={article.id}
            >
              <Image
                source={{ uri: article.urlToImage }}
                width={80}
                height={80}
              />

              <Text
                style={{
                  marginLeft: 10,
                }}
                ellipsizeMode="tail"
                numberOfLines={2}
              >
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
      )
  );

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <FlatList
          data={headlines}
          style={{ marginTop: 10 }}
          stickyHeaderIndices={[]}
          renderItem={({ item, index }) => (
            <Item article={item} index={index} />
          )}
          keyExtractor={(item) => item.id}
          maxToRenderPerBatch={20}
          ListHeaderComponent={() => (
            <View>
              <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                <Text style={{ fontSize: 22, marginTop: 20 }}>
                  Top Headlines
                </Text>
                {news.topArticles?.length > 0 &&
                  news.topArticles.map(
                    (article, index) =>
                      article.urlToImage && (
                        <TouchableWithoutFeedback key={index}>
                          <Swipeable key={index}>
                            <View
                              style={{
                                marginBottom: 10,
                                marginTop: 10,
                                flex: 1,
                                // display: "flex",
                                flexDirection: "row",
                                width: 260,
                                alignItems: "center",
                              }}
                              key={index}
                            >
                              <Image
                                source={{ uri: article.urlToImage }}
                                width={80}
                                height={80}
                              />

                              <Text
                                style={{
                                  marginLeft: 10,
                                }}
                                ellipsizeMode="tail"
                                numberOfLines={2}
                              >
                                {article.title}
                              </Text>
                            </View>
                          </Swipeable>
                        </TouchableWithoutFeedback>
                      )
                  )}
              </View>
              <View>
                <Text style={{ fontSize: 20, marginTop: 10, padding: 15 }}>
                  Latest Headlines
                </Text>
              </View>
            </View>
          )}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ffffff",
  },
  latestNewsHeading: { fontSize: 20, paddingTop: 10, paddingBottom: 10 },
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
    flexGrow: 0,
    // flex: 1,
  },
  content: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
  },
});
