import React from "react"
import { Route, Redirect } from "react-router-dom"
import { CategoryProvider } from "./categories/CategoryProvider"
import CategoryForm from "./categories/CategoryForm"
import CategoryList from "./categories/CategoryList"
import { PostProvider } from "./posts/PostProvider"
import { UserPostList} from "./posts/UserPostList"

export const ApplicationViews = () => {
    return <>
      <Route path="/logout" render={() => {
        localStorage.removeItem("rare_user_id")
        return <Redirect to="/login" />
      }} />

      <PostProvider>
        <Route path="/my-posts" component={UserPostList} />
      </PostProvider>

      <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
        <CategoryProvider>
                <CategoryForm />
                <CategoryList />
        </CategoryProvider>        
      </main>
    </>
}
