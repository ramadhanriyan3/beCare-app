"use client";

import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles);
    },
    [onChange]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image
          alt="uploader image"
          width={500}
          height={500}
          src={convertFileToUrl(files[0])}
          className="max-x-[400px] overflow-hidden object-cover"
        />
      ) : (
        <>
          <Image
            alt="nonUpload"
            width={40}
            height={40}
            src={"/assets/icons/upload.svg"}
          />
          <div className="file-upload_label">
            <p className="text-12-regular text-center">
              <span className="text-green-500">Click to upload </span>
              or drag and drop
            </p>
            <p>SVG, PNG, or JPG</p>
          </div>
        </>
      )}
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag and drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default FileUploader;
