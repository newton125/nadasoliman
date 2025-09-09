'use server'

type reset = {
  email: string
  newPassword: string
}

export async function resetpass({ email, newPassword }: reset) {
  try {
    const res = await fetch(`http://localhost:3000/api/resetPassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
      cache: "no-store",
    })

    console.log("Reset API status:", res.status)

    const data = await res.json()
    console.log("Reset API response:", data)

    // ✅ لو الـ status مش ناجح أرجع الرسالة بدل ما أعمل throw
    if (!res.ok) {
      return { error: data.error || "Reset API failed" }
    }

    return data // ده المفروض يحتوي على token
  } catch (err) {
    console.error("resetpass action error:", err)
    return { error: "Something went wrong" }
  }
}
