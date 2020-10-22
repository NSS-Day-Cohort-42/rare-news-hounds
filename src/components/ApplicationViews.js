import React from "react"
import { Route, Redirect } from "react-router-dom"
import { CategoryProvider } from "./categories/CategoryProvider"
import CategoryForm from "./categories/CategoryForm"
import CategoryList from "./categories/CategoryList"
import { PostProvider } from "./posts/PostProvider"
import { UserPostList} from "./posts/UserPostList"
import TagForm from "./tags/TagForm";
import TagList from "./tags/TagList";
import { TagProvider } from "./tags/TagProvider";

export const ApplicationViews = () => {
  return (
    <>
      <Route
        path="/logout"
        render={() => {
          localStorage.removeItem("rare_user_id");
          return <Redirect to="/login" />;
        }}
      />

      <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
        <PostProvider>
          <Route path="/my-posts" component={UserPostList} />
        </PostProvider>

        <CategoryProvider>
          <Route path="/categories">
            <CategoryForm />
            <CategoryList />
          </Route>
        </CategoryProvider>

        <TagProvider>
          <Route path="/tags">
            <TagForm />
            <TagList />
          </Route>
        </TagProvider>
      </main>
    </>
  );
};
