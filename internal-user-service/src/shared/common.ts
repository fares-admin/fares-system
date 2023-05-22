export interface ResponseFuncs {
  GET?: Function
  POST?: Function
  PUT?: Function
  DELETE?: Function
}

export interface PipelineResponse<T> {
  result?: T
  error?: string
}
