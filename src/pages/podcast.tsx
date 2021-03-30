import {
  gql,
  useApolloClient,
  useLazyQuery,
  useMutation,
} from "@apollo/client";
import { useMe } from "../hooks/useMe";
import { faPlayCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { StarRating } from "../components/star-rating";
import {
  createReviewMutation,
  createReviewMutationVariables,
} from "../__generated__/createReviewMutation";
import { getPodcast, getPodcastVariables } from "../__generated__/getPodcast";

const PODCAST_QUERY = gql`
  query getPodcast($input: PodcastSearchInput!) {
    getPodcast(input: $input) {
      ok
      error
      podcast {
        id
        title
        category
        description
        coverImage
        rating
        episodes {
          id
          title
          category
        }
        reviews {
          id
          title
          text
          creator {
            id
            email
          }
        }
      }
    }
  }
`;

const CREATE_REVIEW_MUTATION = gql`
  mutation createReviewMutation($input: CreateReviewInput!) {
    createReview(input: $input) {
      ok
      error
      id
    }
  }
`;

interface IPodcastParams {
  id: string;
}

interface ICreateReviewForm {
  title: string;
  text: string;
}

export const Podcast = () => {
  const client = useApolloClient();
  const [isEpisode, setIsEpisode] = useState(true);
  const params = useParams<IPodcastParams>();
  const { data: useMeResult } = useMe();
  const [callQuery, { data, error }] = useLazyQuery<
    getPodcast,
    getPodcastVariables
  >(PODCAST_QUERY, {
    onCompleted: () => {
      console.log(data);
    },
  });
  const {
    register,
    getValues,
    handleSubmit,
    setValue,
  } = useForm<ICreateReviewForm>({
    mode: "onChange",
  });
  const onCompleted = (data: createReviewMutation) => {
    const {
      createReview: { ok, id },
    } = data;
    if (ok) {
      const { getPodcast } = client.readQuery({
        query: PODCAST_QUERY,
        variables: { input: { id: +params.id } },
      });
      console.log(getPodcast);
      alert("Review Created!");
      const { title, text } = getValues();
      const data = client.readQuery({
        query: PODCAST_QUERY,
        variables: { input: { id: +params.id } },
      });
      client.writeQuery({
        query: PODCAST_QUERY,
        variables: { input: { id: +params.id } },
        data: {
          getPodcast: {
            ...data.getPodcast,
            podcast: {
              ...data.getPodcast.podcast,
              reviews: [
                {
                  __typename: "Review",
                  id,
                  title,
                  text,
                  creator: {
                    email: useMeResult?.me.email,
                    id: useMeResult?.me.id,
                    __typename: "User",
                  },
                },
                ...data.getPodcast.podcast.reviews,
              ],
            },
          },
        },
      });
    }
    setValue("text", "");
    setValue("title", "");
  };
  const [createReviewMutation] = useMutation<
    createReviewMutation,
    createReviewMutationVariables
  >(CREATE_REVIEW_MUTATION, { onCompleted });
  const onSubmit = () => {
    const { title, text } = getValues();
    createReviewMutation({
      variables: {
        input: {
          title,
          text,
          podcastId: +params.id,
        },
      },
    });
  };
  useEffect(() => {
    callQuery({
      variables: {
        input: {
          id: +params.id,
        },
      },
    });
  }, [callQuery, params, data, error]);
  return (
    <div className="min-h-screen w-full max-w-screen-md mx-auto flex flex-col bg-blue-100 p-4">
      <Helmet>
        <title>{data?.getPodcast.podcast?.title || ""} | Nuber Eats</title>
      </Helmet>
      <div className="flex w-full mb-4">
        <div className="flex w-24 h-24 md:w-36 md:h-36 bg-blue-900 mr-3 rounded-lg"></div>
        <div className="flex flex-col">
          <p className="text-2xl md:text-3xl md:mb-2">
            {data?.getPodcast.podcast?.title}
          </p>
          <p className="md:text-2xl md:mb-2">
            {data?.getPodcast.podcast?.category}
          </p>
          <div className="flex items-center">
            <StarRating rating={data?.getPodcast.podcast?.rating || 0} />
          </div>
        </div>
      </div>
      <div className="flex mb-4">
        <button className="py-1 px-2 text-white bg-blue-400 hover:bg-blue-600 rounded-3xl focus:outline-none">
          <FontAwesomeIcon icon={faPlus} /> Subscribe
        </button>
      </div>
      <div className="flex items-center mb-4">
        <p>{data?.getPodcast.podcast?.description}</p>
      </div>
      <div className="flex text-white">
        <div
          className={`flex w-1/2 h-12 items-center justify-center ${
            isEpisode ? "bg-blue-600" : "bg-blue-400"
          } cursor-pointer rounded-l-3xl`}
          onClick={() => setIsEpisode(true)}
        >
          Episodes
        </div>
        <div
          className={`flex w-1/2 h-12 items-center justify-center ${
            !isEpisode ? "bg-blue-600" : "bg-blue-400"
          } cursor-pointer rounded-r-3xl`}
          onClick={() => setIsEpisode(false)}
        >
          Reviews
        </div>
      </div>
      {isEpisode ? (
        <>
          <div className="flex flex-col p-2 justify-center border-b-2 border-blue-400">
            <p className="text-sm">2021.03.29</p>
            <p className="mb-2">Title template1</p>
            <button className="w-36 py-1 px-2 text-white bg-blue-400 hover:bg-blue-600 rounded-3xl focus:outline-none">
              <FontAwesomeIcon icon={faPlayCircle} /> 1hr 35min
            </button>
          </div>
          <div className="flex flex-col p-2 justify-center border-b-2 border-blue-400">
            <p className="text-sm">2021.03.22</p>
            <p className="mb-2">Title template2</p>
            <button className="w-36 py-1 px-2 text-white bg-blue-400 hover:bg-blue-600 rounded-3xl focus:outline-none">
              <FontAwesomeIcon icon={faPlayCircle} /> 1hr
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col p-2 justify-center border-b-2 border-blue-400">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grip gap-3 my-5 w-full"
            >
              <input
                ref={register({
                  required: "Review Title is required",
                })}
                name="title"
                type="text"
                placeholder="Title"
                className="focus:outline-none focus:border-blue-500 p-2 border border-blue-200 transition-colors w-full mb-2"
              />
              <textarea
                ref={register({
                  required: "Review Text is required",
                })}
                name="text"
                placeholder="Review"
                className="focus:outline-none focus:border-blue-500 p-2 border border-blue-200 transition-colors w-full mb-2"
              />
              <div className="flex justify-end">
                <button className="w-36 py-1 px-2 text-white bg-blue-400 hover:bg-blue-600 rounded-3xl focus:outline-none">
                  Submit
                </button>
              </div>
            </form>
          </div>
          {data?.getPodcast.podcast?.reviews?.map((review) => (
            <div
              key={review.id}
              className="flex flex-col p-2 justify-center border-b-2 border-blue-400"
            >
              <p className="mb-2">{review.title}</p>
              <p className="mb-2">{review.text}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
