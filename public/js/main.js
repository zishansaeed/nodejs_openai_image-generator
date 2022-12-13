const onSubmit = (e) => {
  e.preventDefault();

  document.querySelector(".msg").textContent = "";
  document.querySelector("#image").src = "";

  const prompt = document.querySelector("#prompt").value;

  if (prompt === "") {
    alert("Please add some text ");
    return;
  }

  generateImageRequest(prompt);
};

const generateImageRequest = async (prompt) => {
  try {
    showSpinner();
    const response = await fetch("/openai/generateimage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error("That image could not be generated");
    }

    const data = await response.json();
    const imgUrl = data.data;

    document.querySelector("#image").src = imgUrl;
    removeSpinner();
  } catch (error) {
    document.querySelector(".msg").textContent = error;
  }
};

// Add spinner to screen
const showSpinner = () =>
  document.querySelector(".spinner").classList.add("show");

// Remove spinner from  screen
const removeSpinner = () =>
  document.querySelector(".spinner").classList.remove("show");

document.querySelector("#image-form").addEventListener("submit", onSubmit);
