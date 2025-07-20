// Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
// SPDX-License-Identifier: MIT

import { resolveServiceURL } from "./resolve-service-url";

export async function generatePPT(content: string) {
  const response = await fetch(resolveServiceURL("ppt/generate"), {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  const blob = new Blob([arrayBuffer], { type: "application/vnd.openxmlformats-officedocument.presentationml.presentation" });
  const pptUrl = URL.createObjectURL(blob);
  return pptUrl;
} 