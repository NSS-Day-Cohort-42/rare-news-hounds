import React from "react";
import { Route, Redirect } from "react-router-dom";
import { CategoryProvider } from "./categories/CategoryProvider";
import CategoryForm from "./categories/CategoryForm";
import CategoryList from "./categories/CategoryList";
import { PostForm } from "./posts/postForm";
import { PostProvider } from "./posts/PostProvider";
import { UserPostList } from "./posts/UserPostList";
import TagForm from "./tags/TagForm";
import TagList from "./tags/TagList";
import { TagProvider } from "./tags/TagProvider";
import PostDetail from "./posts/PostDetail";
import { PostList } from "./posts/PostList";
import { PostTagProvider } from "./postTags/PostTagProvider";
import { CommentProvider } from "./comments/CommentProvider";
import { CategoryManager } from "./categories/CategoryManager";

export const ApplicationViews = () => {
  return (
    <>
      <Route
        path="/logout"
        render={() => {
          // Removes the user Id and Token from local storage and redirects the user back to log in
          localStorage.removeItem("rare_user_id");
          localStorage.removeItem("rare_user_token");
          return <Redirect to="/login" />;
        }}
      />

      <main className="container p-5">
        <PostProvider>
          <CategoryProvider>
            <Route path="/posts/create" component={PostForm} />

            <Route path="/posts/edit/:postId" component={PostForm} />
          </CategoryProvider>
        </PostProvider>
        <PostProvider>
          <CategoryProvider>
            <Route exact path="/" component={PostList} />
          </CategoryProvider>
        </PostProvider>

        <PostTagProvider>
          <TagProvider>
            <PostProvider>
              <CategoryProvider>
                <CommentProvider>
                  <Route path="/my-posts" component={UserPostList} />
                  <Route
                    exact
                    path="/posts/:postId(\d+)"
                    render={(props) => <PostDetail {...props} />}
                  />
                </CommentProvider>
              </CategoryProvider>
            </PostProvider>
          </TagProvider>
        </PostTagProvider>

        <CategoryProvider>
          <Route path="/categories">
            <CategoryManager />
          </Route>
        </CategoryProvider>

        <TagProvider>
          <Route path="/tags">
            <h1 className="text-center my-4">Tags</h1>
            <TagForm />
            <TagList />
          </Route>
        </TagProvider>
      </main>
    </>
  );
};
