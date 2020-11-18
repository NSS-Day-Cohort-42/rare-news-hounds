import React from "react";
import { Route, Redirect } from "react-router-dom";
import { CategoryProvider } from "./categories/CategoryProvider";
import { PostForm } from "./posts/postForm";
import { PostProvider } from "./posts/PostProvider";
import { UserPostList } from "./posts/UserPostList";
import { TagProvider } from "./tags/TagProvider";
import PostDetail from "./posts/PostDetail";
import { PostList } from "./posts/PostList";
import { SubscribedPostList } from "./posts/SubscribedPostList";
import { CommentProvider } from "./comments/CommentProvider";
import { CategoryManager } from "./categories/CategoryManager";
import { CommentList } from "./comments/CommentList";
import CommentForm from "./comments/CommentForm";
import { TagManager } from "./tags/TagManager";
import { ProfileList } from "./profiles/ProfileList";
import { ProfileProvider } from "./profiles/ProfileProvider";
import ProfileDetail from "./profiles/ProfileDetail";
import { SubscriptionProvider } from "./subscriptions/SubscriptionsProvider";
import { ReactionProvider } from "./reactions/ReactionProvider";

export const ApplicationViews = () => {
  return (
    <>
      <Route
        path="/logout"
        render={() => {
          // Removes the user Id and Token from local storage and redirects the user back to log in
          localStorage.removeItem("rare_user_id");
          localStorage.removeItem("rare_user_token");
          localStorage.removeItem("is_admin");
          return <Redirect to="/login" />;
        }}
      />

      <main className="container p-5">
        <PostProvider>
          <CategoryProvider>
            <TagProvider>
              <Route exact path="/" component={SubscribedPostList} />

              <Route exact path="/posts" component={PostList} />

              <Route path="/posts/create" component={PostForm} />

              <Route path="/posts/edit/:postId" component={PostForm} />
            </TagProvider>
          </CategoryProvider>
        </PostProvider>

        <TagProvider>
          <PostProvider>
            <CategoryProvider>
              <CommentProvider>
                <ReactionProvider>
                  <Route path="/my-posts">
                    <UserPostList
                      userId={parseInt(localStorage.getItem("rare_user_id"))}
                    />
                  </Route>
                  <Route
                    exact
                    path="/posts/categories/:categoryId(\d+)"
                    render={(props) => <PostList {...props} />}
                  />
                  <Route
                    exact
                    path="/posts/:postId(\d+)"
                    render={(props) => <PostDetail {...props} />}
                  />
                  <Route
                    exact
                    path="/posts/:postId(\d+)/comments"
                    render={(props) => (
                      <>
                        <CommentForm {...props} />
                        <CommentList {...props} />
                      </>
                    )}
                  />
                  <Route
                    exact
                    path="/profiles/:profileId/posts"
                    render={(props) => (
                      <UserPostList
                        userId={parseInt(props.match.params.profileId)}
                      />
                    )}
                  />
                </ReactionProvider>
              </CommentProvider>
            </CategoryProvider>
          </PostProvider>
        </TagProvider>

        <CategoryProvider>
          <Route path="/categories">
            <CategoryManager />
          </Route>
        </CategoryProvider>

        <Route path="/profileList">
          <ProfileList />
        </Route>

        <TagProvider>
          <Route path="/tags">
            <TagManager />
          </Route>
        </TagProvider>

        <ProfileProvider>
          <SubscriptionProvider>
            <Route exact path="/profiles">
              <ProfileList />
            </Route>
            <Route
              exact
              path="/profiles/:profileId(\d+)"
              render={(props) => <ProfileDetail {...props} />}
            />
          </SubscriptionProvider>
        </ProfileProvider>
      </main>
    </>
  );
};
