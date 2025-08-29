export const apiFetch = async (method, url, data = null) => {
  try {
    const options = {
      method
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    const result = await handleResponse(response);

    if (!result.success) {
      console.error(`${method} failed:`, result.message);
    } else {
      console.log(`${method} success:`, result.data);
    }

    return result;
  } catch (error) {
    console.error(`${method} error:`, error);
    return {
      success: false,
      message: error.message || error.toString(),
    };
  }
};

export const handleResponse = async (response) => {
  const contentType = response.headers.get("Content-Type");

  if (contentType && contentType.includes("application/json")) {
    const data = await response.json();
    return {
      success: response.ok,
      data: response.ok ? data : null,
      message: response.ok ? null : data,
    };
  } else {
    const text = await response.text();
    return {
      success: response.ok,
      data: response.ok ? text : null,
      message: response.ok ? null : text,
    };
  }
};



