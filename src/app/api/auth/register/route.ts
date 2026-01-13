import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { createUser, findUserByEmail } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, company, plan } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const existingUser = findUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    const hashedPassword = await hash(password, 12)

    const user = createUser({
      id: crypto.randomUUID(),
      name,
      email,
      password: hashedPassword,
      company,
      plan: plan || 'basic',
      createdAt: new Date(),
    })

    return NextResponse.json({
      message: 'User created successfully',
      user: { id: user.id, email: user.email, name: user.name },
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
