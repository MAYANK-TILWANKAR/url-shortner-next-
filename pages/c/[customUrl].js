import { useRouter } from "next/router";
import { useEffect } from "react";
import connectToDatabase from "../../lib/mongoose";
import Url from "../../models/Url";

const Redirect = ({ originalUrl }) => {
  const router = useRouter();

  useEffect(() => {
    if (originalUrl) {
      window.location.href = originalUrl;
    } else {
      router.push("/");
    }
  }, [originalUrl]);

  return null;
};

export async function getServerSideProps(context) {
  console.log("HEY2");
  const { customUrl } = context.params;
  await connectToDatabase();

  const url = await Url.findOne({ customUrl });

  if (!url) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      originalUrl: url.originalUrl,
    },
  };
}

export default Redirect;
