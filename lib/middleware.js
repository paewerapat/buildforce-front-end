import asyncBusboy from "async-busboy";

export const Middleware = (handler) => async (req, res) => {
    // we only care about POST's with a Content-Type of multipart/form-data
    if (req.method == "POST" && req.headers['content-type'].includes('multipart/form-data')) {
      // busboy will parse the req and extract the uploaded files
      const { files } = await asyncBusboy(req);

      // extend the req object with the processed files
      // we'll be able to access this in our API route later
      req.files = files;
    }

    // pass on the req and res to the API Route
    return handler(req, res);
}