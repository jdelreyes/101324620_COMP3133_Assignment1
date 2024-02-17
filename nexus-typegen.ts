/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./src/context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Auth: { // root type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Employee: { // root type
    _id: string; // String!
    email: string; // String!
    firstName: string; // String!
    gender: string; // String!
    lastName: string; // String!
    salary: number; // Float!
  }
  Mutation: {};
  Query: {};
  User: { // root type
    _id: string; // String!
    email: string; // String!
    password: string; // String!
    userName: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Auth: { // field return type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Employee: { // field return type
    _id: string; // String!
    email: string; // String!
    firstName: string; // String!
    gender: string; // String!
    lastName: string; // String!
    salary: number; // Float!
  }
  Mutation: { // field return type
    login: NexusGenRootTypes['Auth']; // Auth!
    signup: NexusGenRootTypes['Auth']; // Auth!
  }
  Query: { // field return type
    getEmployee: NexusGenRootTypes['Employee']; // Employee!
    getEmployees: NexusGenRootTypes['Employee'][]; // [Employee!]!
  }
  User: { // field return type
    _id: string; // String!
    email: string; // String!
    password: string; // String!
    userName: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  Auth: { // field return type name
    token: 'String'
    user: 'User'
  }
  Employee: { // field return type name
    _id: 'String'
    email: 'String'
    firstName: 'String'
    gender: 'String'
    lastName: 'String'
    salary: 'Float'
  }
  Mutation: { // field return type name
    login: 'Auth'
    signup: 'Auth'
  }
  Query: { // field return type name
    getEmployee: 'Employee'
    getEmployees: 'Employee'
  }
  User: { // field return type name
    _id: 'String'
    email: 'String'
    password: 'String'
    userName: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    login: { // args
      password: string; // String!
      userName: string; // String!
    }
    signup: { // args
      email: string; // String!
      password: string; // String!
      userName: string; // String!
    }
  }
  Query: {
    getEmployee: { // args
      _id: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}