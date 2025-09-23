import { TProperties, TObject, Type } from "@sinclair/typebox";

export const StrictObject = <T extends TProperties>(
  properties: T,
  options: Record<string, string> = {}
): TObject<T> => {
  return Type.Object(properties, {
    additionalProperties: false,
    ...options
  });
};