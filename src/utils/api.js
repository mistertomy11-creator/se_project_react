import { BaseUrl } from "../utils/constants";

function checkResponse(res) {
  if (!res.ok) {
    return res
      .text()
      .then((text) => Promise.reject(text || `Error: ${res.status}`));
  }

  // 204 No Content: nothing to parse
  if (res.status === 204) return Promise.resolve();

  // Try JSON, but don't crash if body is empty
  return res.text().then((text) => (text ? JSON.parse(text) : {}));
}

// Unprotected (allowed for unauthorized users)
function getItems() {
  return fetch(`${BaseUrl}/items`).then(checkResponse);
}

// Protected (allowed for authorized users only)
function addItem({ name, imageUrl, weather }) {
  const token = localStorage.getItem("jwt");
  return fetch(`${BaseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
}

// protected
function changeLikeStatus(itemId, isLiked, token) {
  return fetch(`${BaseUrl}/items/${itemId}/likes`, {
    method: isLiked ? "DELETE" : "PUT",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

// Protected (allowed for authorized users only)
function deleteItem(id) {
  const token = localStorage.getItem("jwt");
  return fetch(`${BaseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function updateProfile({ name, avatar }, token) {
  return fetch(`${BaseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
}

export { getItems, addItem, changeLikeStatus, deleteItem, updateProfile };
