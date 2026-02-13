export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          content: string
          created_at: string | null
          date: string | null
          id: string
          title: string
          urgent: boolean | null
        }
        Insert: {
          content: string
          created_at?: string | null
          date?: string | null
          id?: string
          title: string
          urgent?: boolean | null
        }
        Update: {
          content?: string
          created_at?: string | null
          date?: string | null
          id?: string
          title?: string
          urgent?: boolean | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      donation_receipts: {
        Row: {
          created_at: string | null
          donation_id: string
          id: string
          pdf_url: string | null
          receipt_number: string
          sent_at: string | null
        }
        Insert: {
          created_at?: string | null
          donation_id: string
          id?: string
          pdf_url?: string | null
          receipt_number: string
          sent_at?: string | null
        }
        Update: {
          created_at?: string | null
          donation_id?: string
          id?: string
          pdf_url?: string | null
          receipt_number?: string
          sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donation_receipts_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: false
            referencedRelation: "donations"
            referencedColumns: ["id"]
          },
        ]
      }
      donations: {
        Row: {
          amount: number
          campaign_id: string | null
          completed_at: string | null
          created_at: string | null
          currency: string | null
          donor_id: string | null
          fund_type: string
          gift_aid_amount: number | null
          gift_aid_claimed: boolean | null
          id: string
          idempotency_key: string | null
          is_recurring: boolean | null
          metadata: Json | null
          recurring_interval: string | null
          status: string | null
          stripe_checkout_session_id: string | null
          stripe_payment_intent_id: string | null
          stripe_subscription_id: string | null
        }
        Insert: {
          amount: number
          campaign_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          currency?: string | null
          donor_id?: string | null
          fund_type: string
          gift_aid_amount?: number | null
          gift_aid_claimed?: boolean | null
          id?: string
          idempotency_key?: string | null
          is_recurring?: boolean | null
          metadata?: Json | null
          recurring_interval?: string | null
          status?: string | null
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_subscription_id?: string | null
        }
        Update: {
          amount?: number
          campaign_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          currency?: string | null
          donor_id?: string | null
          fund_type?: string
          gift_aid_amount?: number | null
          gift_aid_claimed?: boolean | null
          id?: string
          idempotency_key?: string | null
          is_recurring?: boolean | null
          metadata?: Json | null
          recurring_interval?: string | null
          status?: string | null
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_subscription_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "donors"
            referencedColumns: ["id"]
          },
        ]
      }
      donors: {
        Row: {
          address_line1: string | null
          address_line2: string | null
          city: string | null
          country: string | null
          created_at: string | null
          email: string
          full_name: string
          gift_aid_declaration_date: string | null
          gift_aid_declaration_version: string | null
          gift_aid_eligible: boolean | null
          id: string
          phone: string | null
          postcode: string | null
          stripe_customer_id: string | null
          updated_at: string | null
        }
        Insert: {
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email: string
          full_name: string
          gift_aid_declaration_date?: string | null
          gift_aid_declaration_version?: string | null
          gift_aid_eligible?: boolean | null
          id?: string
          phone?: string | null
          postcode?: string | null
          stripe_customer_id?: string | null
          updated_at?: string | null
        }
        Update: {
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          gift_aid_declaration_date?: string | null
          gift_aid_declaration_version?: string | null
          gift_aid_eligible?: boolean | null
          id?: string
          phone?: string | null
          postcode?: string | null
          stripe_customer_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      event_proposals: {
        Row: {
          arabic: string | null
          category: string | null
          created_at: string | null
          date: string
          description: string | null
          id: string
          location: string | null
          proposer_email: string
          proposer_name: string
          proposer_phone: string | null
          status: string | null
          time: string
          title: string
        }
        Insert: {
          arabic?: string | null
          category?: string | null
          created_at?: string | null
          date: string
          description?: string | null
          id?: string
          location?: string | null
          proposer_email: string
          proposer_name: string
          proposer_phone?: string | null
          status?: string | null
          time: string
          title: string
        }
        Update: {
          arabic?: string | null
          category?: string | null
          created_at?: string | null
          date?: string
          description?: string | null
          id?: string
          location?: string | null
          proposer_email?: string
          proposer_name?: string
          proposer_phone?: string | null
          status?: string | null
          time?: string
          title?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          arabic: string | null
          category: string | null
          created_at: string | null
          date: string
          description: string | null
          id: string
          location: string | null
          time: string
          title: string
        }
        Insert: {
          arabic?: string | null
          category?: string | null
          created_at?: string | null
          date: string
          description?: string | null
          id?: string
          location?: string | null
          time: string
          title: string
        }
        Update: {
          arabic?: string | null
          category?: string | null
          created_at?: string | null
          date?: string
          description?: string | null
          id?: string
          location?: string | null
          time?: string
          title?: string
        }
        Relationships: []
      }
      gift_aid_declarations: {
        Row: {
          address_line1: string
          address_line2: string | null
          city: string
          declaration_text: string
          declaration_version: string
          declared_at: string | null
          donor_id: string
          full_name: string
          id: string
          ip_address: string | null
          postcode: string
          user_agent: string | null
        }
        Insert: {
          address_line1: string
          address_line2?: string | null
          city: string
          declaration_text: string
          declaration_version: string
          declared_at?: string | null
          donor_id: string
          full_name: string
          id?: string
          ip_address?: string | null
          postcode: string
          user_agent?: string | null
        }
        Update: {
          address_line1?: string
          address_line2?: string | null
          city?: string
          declaration_text?: string
          declaration_version?: string
          declared_at?: string | null
          donor_id?: string
          full_name?: string
          id?: string
          ip_address?: string | null
          postcode?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gift_aid_declarations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "donors"
            referencedColumns: ["id"]
          },
        ]
      }
      prayer_times: {
        Row: {
          asr: string
          created_at: string | null
          date: string
          dhuhr: string
          fajr: string
          id: string
          isha: string
          maghrib: string
          sunrise: string
        }
        Insert: {
          asr: string
          created_at?: string | null
          date: string
          dhuhr: string
          fajr: string
          id?: string
          isha: string
          maghrib: string
          sunrise: string
        }
        Update: {
          asr?: string
          created_at?: string | null
          date?: string
          dhuhr?: string
          fajr?: string
          id?: string
          isha?: string
          maghrib?: string
          sunrise?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          amount: number
          cancelled_at: string | null
          created_at: string | null
          currency: string | null
          current_period_end: string | null
          current_period_start: string | null
          donor_id: string | null
          fund_type: string
          gift_aid_eligible: boolean | null
          id: string
          interval: string | null
          status: string | null
          stripe_price_id: string | null
          stripe_subscription_id: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          cancelled_at?: string | null
          created_at?: string | null
          currency?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          donor_id?: string | null
          fund_type: string
          gift_aid_eligible?: boolean | null
          id?: string
          interval?: string | null
          status?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          cancelled_at?: string | null
          created_at?: string | null
          currency?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          donor_id?: string | null
          fund_type?: string
          gift_aid_eligible?: boolean | null
          id?: string
          interval?: string | null
          status?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "donors"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_receipt_number: { Args: never; Returns: string }
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
