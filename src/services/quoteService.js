const getQuote = async () => {
  try {
    const response = await fetch("https://quoteslate.vercel.app/api/quotes/random?tag=work");
    const data = await response.json();
    return {
      text: data.quote,
      author: data.author
    };
  } catch (error) {
    console.error("Quote API Error:", error);
    return {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs"
    };
  }
};

export { getQuote };