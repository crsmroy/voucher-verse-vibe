export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          alternate_phone_number: string | null
          category: string | null
          city: string | null
          created_at: string | null
          date_time: string | null
          email_address: string | null
          full_address: string | null
          full_name: string | null
          gst: string | null
          id: string
          landmark: string | null
          order_id: string
          payment_proof_link: string | null
          phone_number: string | null
          pincode: string | null
          platform: string | null
          premium_price: number | null
          price: number | null
          product_link: string | null
          quantity: number | null
          referral_code: string | null
          second_product_category: string | null
          second_product_gst_percentage: number | null
          second_product_link: string | null
          second_product_price: number | null
          second_product_quantity: number | null
          service_fee: number | null
          state: string | null
          status: string | null
          total_to_pay: number | null
          transaction_id: string | null
          voucher_amount: number | null
          whatsapp_number: string | null
        }
        Insert: {
          alternate_phone_number?: string | null
          category?: string | null
          city?: string | null
          created_at?: string | null
          date_time?: string | null
          email_address?: string | null
          full_address?: string | null
          full_name?: string | null
          gst?: string | null
          id?: string
          landmark?: string | null
          order_id: string
          payment_proof_link?: string | null
          phone_number?: string | null
          pincode?: string | null
          platform?: string | null
          premium_price?: number | null
          price?: number | null
          product_link?: string | null
          quantity?: number | null
          referral_code?: string | null
          second_product_category?: string | null
          second_product_gst_percentage?: number | null
          second_product_link?: string | null
          second_product_price?: number | null
          second_product_quantity?: number | null
          service_fee?: number | null
          state?: string | null
          status?: string | null
          total_to_pay?: number | null
          transaction_id?: string | null
          voucher_amount?: number | null
          whatsapp_number?: string | null
        }
        Update: {
          alternate_phone_number?: string | null
          category?: string | null
          city?: string | null
          created_at?: string | null
          date_time?: string | null
          email_address?: string | null
          full_address?: string | null
          full_name?: string | null
          gst?: string | null
          id?: string
          landmark?: string | null
          order_id?: string
          payment_proof_link?: string | null
          phone_number?: string | null
          pincode?: string | null
          platform?: string | null
          premium_price?: number | null
          price?: number | null
          product_link?: string | null
          quantity?: number | null
          referral_code?: string | null
          second_product_category?: string | null
          second_product_gst_percentage?: number | null
          second_product_link?: string | null
          second_product_price?: number | null
          second_product_quantity?: number | null
          service_fee?: number | null
          state?: string | null
          status?: string | null
          total_to_pay?: number | null
          transaction_id?: string | null
          voucher_amount?: number | null
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      replacement_return_requests: {
        Row: {
          amount_paid: number
          created_at: string
          full_name: string
          id: string
          order_date: string
          phone_number: string
          product_link: string
          quantity: number
          request_type: string
          return_reason: string
          status: string | null
          transaction_id: string | null
        }
        Insert: {
          amount_paid: number
          created_at?: string
          full_name: string
          id?: string
          order_date: string
          phone_number: string
          product_link: string
          quantity?: number
          request_type: string
          return_reason: string
          status?: string | null
          transaction_id?: string | null
        }
        Update: {
          amount_paid?: number
          created_at?: string
          full_name?: string
          id?: string
          order_date?: string
          phone_number?: string
          product_link?: string
          quantity?: number
          request_type?: string
          return_reason?: string
          status?: string | null
          transaction_id?: string | null
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
