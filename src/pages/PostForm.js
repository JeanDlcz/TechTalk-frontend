import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { usePosts } from "../context/postContext";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Toaster, toast } from "react-hot-toast";
import { getPostsRequest } from "../api/posts";

export function PostForm() {
  const { createPost, getPost, updatePost } = usePosts();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    description: "",
    image: null,
    categories: "",
    source: "",
    author: "",
  });
  const params = useParams();

  useEffect(() => {
    (async () => {
      if (params.id) {
        const post = await getPost(params.id);
        setPost({
          title: post.title,
          description: post.description,
          categories: post.categories,
          source: post.source,
          author: post.author,
          image: post.image,
        });
      }
    })();
  }, [params.id, getPost]);

  const [imagePreview, setImagePreview] = useState({
    src: "",
    alt: "original imagen",
  });

  return (
    <div className="flex items-center justify-center">
      <div className="bg-blue-950 p-10 shadow-md shadow-black mt-7 animate-fade-down animate-once animate-duration-500 animate-ease-linear">
        <header className="flex justify-between items-center py-4 text-white">
          <h3 className="text-xl">New Post</h3>
        </header>

        <Formik
          initialValues={post}
          validationSchema={Yup.object({
            title: Yup.string().required("Title is Required"),
            description: Yup.string().required("Description is Required"),
            categories: Yup.string().transform((value, originalValue) => {
              return originalValue ? originalValue.toString() : value;
            }).required("Categories is Required"),
            source: Yup.string().required("Source is Required"),
            author: Yup.string().required("Author is Required"),
          })}
          onSubmit={async (values, actions) => {
            if (params.id) {
              await updatePost(params.id, values);
            } else {
              await createPost(values);
            }

            try {
              toast.success("Post saved successfully and posts list updated!");
            } catch (error) {
              toast.error("Error updating posts list.");
            }

            actions.setSubmitting(false);
            navigate("/admin");
            await getPostsRequest();
          }}
          enableReinitialize
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <label
                htmlFor="title"
                className="text-sm block font-bold text-gray-400"
              >
                Title
              </label>
              <Field
                id="title"
                name="title"
                placeholder="Title"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
              />
              <ErrorMessage
                component="p"
                name="title"
                className="text-red-400 text-sm"
              />

              <label
                htmlFor="description"
                className="text-sm block font-bold text-gray-400 "
              >
                Description
              </label>
              <Field
                id="description"
                component="textarea"
                name="description"
                placeholder="Description"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                rows={5}
              />
              <ErrorMessage
                component="p"
                name="description"
                className="text-red-400 text-sm"
              />

              <label
                htmlFor="categories"
                className="text-sm block font-bold text-gray-400"
              >
                Categories
              </label>
              <Field
                id="categories"
                name="categories"
                placeholder="Categories"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
              />
              <ErrorMessage
                component="p"
                name="categories"
                className="text-red-400 text-sm"
              />

              <label
                htmlFor="source"
                className="text-sm block font-bold text-gray-400"
              >
                Source
              </label>
              <Field
                id="source"
                name="source"
                placeholder="Source"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
              />
              <ErrorMessage
                component="p"
                name="source"
                className="text-red-400 text-sm"
              />

              <label
                htmlFor="author"
                className="text-sm block font-bold text-gray-400"
              >
                Author
              </label>
              <Field
                id="author"
                name="author"
                placeholder="Author"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
              />
              <ErrorMessage
                component="p"
                name="author"
                className="text-red-400 text-sm"
              />

              <label
                htmlFor="image"
                className="text-sm block font-bold text-gray-400"
              >
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                onChange={(e) => {
                  const selectedImage = e.target.files[0];
                  setFieldValue("image", selectedImage);

                  const imageUrl = URL.createObjectURL(selectedImage);

                  setImagePreview((prev) => ({ ...prev, src: imageUrl }));
                }}
              />
              {imagePreview.src || (post.image && post.image.url) ? (
                <img
                  id="image-preview"
                  src={imagePreview.src || post.image.url}
                  alt={imagePreview.alt}
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
              ) : null}

              <button
                type="submit"
                className="bg-yellow-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400 animate-pulse float-right"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center m-[10px]">
                    <div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
                    <div className="ml-2">Processing...</div>
                  </div>
                ) : (
                  "Save"
                )}
              </button>
            </Form>
          )}
        </Formik>
        <Toaster />
      </div>
    </div>
  );
}
