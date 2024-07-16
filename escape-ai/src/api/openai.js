export const fetchGameStages = async (theme) => {
  const response = await fetch("/api/openai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ theme }),
  });

  const data = await response.json();
  return data.stages;
};
