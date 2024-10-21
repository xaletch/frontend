import { useParams } from "react-router-dom"
import { ReadContent } from "../components/read"
import { useLazyGetPublicQuery } from "../redux/api";
import { useEffect, useState } from "react";
import { NoteContentInterface } from "../app/types";

export const ReadDocument = () => {
  const { id } = useParams();

  const [get, { data, isSuccess }] = useLazyGetPublicQuery();
  const [docsData, setDocsData] = useState<NoteContentInterface>();

  useEffect(() => {
    if (id) {
      get( id )
        .catch((err) => {
          console.log(err)
        });
    }
  }, [id])

  useEffect(() => {
    if (data && data.data && isSuccess) {
      setDocsData(data.data)
    }
  }, [data, isSuccess])

  return (
    <div className="container mx-auto">
      <ReadContent imageUrl={docsData?.imageUrl || ''} name={docsData?.name || ''} smile={docsData?.smile || ''} _id={docsData?._id || ''} blocks={docsData?.blocks || []} isPublic={docsData?.isPublic || false} isSelectNoteSuccess={false} resetWidth={undefined} closeMenu={false} />
    </div>
  )
}
