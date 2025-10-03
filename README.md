const handlePublish = async (isDraft) => {
    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("title", postData.title);
      formData.append("content", postData.content);
      formData.append("tags", postData.tags);
      formData.append("isDraft", isDraft);
      formData.append("generatedByAI", postData.generatedByAI);

      if (postData.coverImageFile) {
        formData.append("coverImage", postData.coverImageFile);
      }

      let response;
      if (isEdit) {
        response = await axiosInstance.put(
          API_PATHS.POSTS.UPDATE(postData.id),
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        response = await axiosInstance.post(API_PATHS.POSTS.CREATE, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (response.data) {
        navigate("/admin/posts");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to save post");
    } finally {
      setLoading(false);
    }
  };