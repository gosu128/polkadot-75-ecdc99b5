export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      industries: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      pitch_advise: {
        Row: {
          content: string
          id: number
          section: string
        }
        Insert: {
          content: string
          id?: number
          section: string
        }
        Update: {
          content?: string
          id?: number
          section?: string
        }
        Relationships: []
      }
      segments: {
        Row: {
          abstract: string | null
          awareness: number | null
          ca_customization: string | null
          ca_interoperability: string | null
          ca_resiliance: string | null
          ca_scalability: string | null
          capability: string | null
          challenges: string | null
          complexity: number | null
          compliance: number | null
          customization: number | null
          definition: string | null
          id: number
          industry_id: number | null
          interoperability: number | null
          messaging: string | null
          name: string | null
          personas_1: string | null
          personas_2: string | null
          personas_3: string | null
          pmf: number | null
          positioning_statement: string | null
          proof_points: string | null
          regions: string | null
          reliability: number | null
          roi: number | null
          scalability: number | null
          tam: number | null
          tech: number | null
          trends: string | null
          usecases_general: string | null
          usecases_web3: string | null
          value_prop: string | null
        }
        Insert: {
          abstract?: string | null
          awareness?: number | null
          ca_customization?: string | null
          ca_interoperability?: string | null
          ca_resiliance?: string | null
          ca_scalability?: string | null
          capability?: string | null
          challenges?: string | null
          complexity?: number | null
          compliance?: number | null
          customization?: number | null
          definition?: string | null
          id: number
          industry_id?: number | null
          interoperability?: number | null
          messaging?: string | null
          name?: string | null
          personas_1?: string | null
          personas_2?: string | null
          personas_3?: string | null
          pmf?: number | null
          positioning_statement?: string | null
          proof_points?: string | null
          regions?: string | null
          reliability?: number | null
          roi?: number | null
          scalability?: number | null
          tam?: number | null
          tech?: number | null
          trends?: string | null
          usecases_general?: string | null
          usecases_web3?: string | null
          value_prop?: string | null
        }
        Update: {
          abstract?: string | null
          awareness?: number | null
          ca_customization?: string | null
          ca_interoperability?: string | null
          ca_resiliance?: string | null
          ca_scalability?: string | null
          capability?: string | null
          challenges?: string | null
          complexity?: number | null
          compliance?: number | null
          customization?: number | null
          definition?: string | null
          id?: number
          industry_id?: number | null
          interoperability?: number | null
          messaging?: string | null
          name?: string | null
          personas_1?: string | null
          personas_2?: string | null
          personas_3?: string | null
          pmf?: number | null
          positioning_statement?: string | null
          proof_points?: string | null
          regions?: string | null
          reliability?: number | null
          roi?: number | null
          scalability?: number | null
          tam?: number | null
          tech?: number | null
          trends?: string | null
          usecases_general?: string | null
          usecases_web3?: string | null
          value_prop?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "segments_industry_fk"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "industries"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
