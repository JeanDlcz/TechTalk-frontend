import { useState } from "react";
import { toast } from "react-hot-toast";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { apiEmail,apiWeb } from "../Config";

const ContactForm = () => {
  const savedEmail = Cookies.get("email");

  const [formValues, setFormValues] = useState({
    name: "",
    email: savedEmail,
    message: "",
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    if (form.checkValidity()) {
      const formData = new FormData(form);

      fetch(apiWeb, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      })
        .then(async (response) => {

          if (response.status === 200) {
            toast.success("Submitted successfully!");
          } else {
            toast.error("Something has gone wrong");
          }
        })
        .catch((error) => {});

      setFormValues({
        name: "",
        email: savedEmail,
        message: "",
      });

    }
  };

  return (
    <div className="flex min-h-screen items-center justify-start bg-white">
      <div className="mx-auto w-full max-w-lg">
        <h1 className="text-4xl font-medium animate-bounce">
          <FontAwesomeIcon icon={faHeadset} /> Contact Us
        </h1>
        <p className="mt-3">
          Email us at help@techtalk12.com or message us here:
        </p>

        <form action={apiWeb} className="mt-10" onSubmit={handleSubmit}>

          <input type="hidden" name="access_key" value={apiEmail} />


          <div className="grid gap-6 sm:grid-cols-2">
            <div className="relative z-0">
              <input
                type="text"
                name="name"
                className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
                value={formValues.name}
                onChange={handleChange}
                required
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                Your name
              </label>
            </div>
            <div className="relative z-0">
              <input
                type="text"
                name="email"
                className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
                value={formValues.email}
                onChange={handleChange}
                readOnly
                required
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                Your email
              </label>
            </div>
            <div className="relative z-0 col-span-2">
              <textarea
                name="message"
                rows="5"
                className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
                value={formValues.message}
                onChange={handleChange}
                required
              ></textarea>
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                Your message
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="mt-5 rounded-md py-2 px-4 bg-transparent text-black font-semibold border border-black hover:bg-black hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
            required
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
